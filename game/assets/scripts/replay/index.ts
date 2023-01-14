import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { animateRibbonAppear } from '../tween';
import { system } from '../util/system';

import { playDraw } from './draw';
import { playFight } from './fight';
import { playSummon } from './summon';

let replaying = false;
const { BundleGroup, mergeFragmentToState, runCommand } = Engine;

export const replay = async (): Promise<void> => {
	const remoteHistoryLength = system.remoteHistory.length;
	const isUpToDate = system.replayLevel >= remoteHistoryLength;

	if (replaying || isUpToDate) return;

	replaying = true;
	console.log('replaying', system.replayLevel, '->', remoteHistoryLength);

	for (let i = system.replayLevel; i < remoteHistoryLength; i += 1) {
		const bundle = system.remoteHistory[i];
		const group = bundle?.group;
		const isInitialDraw = group === BundleGroup.InitialDraw;
		const isTurnDraw = group === BundleGroup.TurnDraw;
		const isDraw = isInitialDraw || isTurnDraw;
		const isMyPhase = bundle.phaseOf === system.playerIds.me;

		runCommandBundle(bundle);

		if (isTurnDraw && isMyPhase) {
			await animateRibbonAppear('Your Turn');
		}

		if (isDraw) {
			await playDraw(bundle);
		} else if (BundleGroup.Summon === group) {
			await playSummon(bundle);
		} else if (BundleGroup.FightCombat === group) {
			await playFight(bundle);
		}

		system.replayLevel += 1;
	}

	// mergeFragmentToState(system.duel, );
	// const toIndex = system.serverState.history.length - 1;
	// const bundles = system.serverState.history.slice(fromIndex, toIndex);

	replaying = false;

	await replay();
};

export const runCommandBundle = (bundle: DuelCommandBundle): void => {
	bundle.commands.forEach((command) => {
		mergeFragmentToState(
			system.duel,
			runCommand({ duel: system.duel, command }),
		);
	});
};
