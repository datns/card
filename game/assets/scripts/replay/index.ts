import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { animateRibbonAppear } from 'db://assets/scripts/tween';

import { system } from '../util/system';

import { replayDraw } from './draw';

let replaying = false;
const { BundleGroup, mergeFragmentToState, runCommand } = Engine;

export const replay = async (): Promise<void> => {
	if (replaying) return;

	replaying = true;
	const remoteHistoryLength = system.remoteHistory.length;

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
			await replayDraw(bundle);
		}
	}

	// mergeFragmentToState(system.duel, );
	// const toIndex = system.serverState.history.length - 1;
	// const bundles = system.serverState.history.slice(fromIndex, toIndex);

	replaying = false;
};

export const runCommandBundle = (bundle: DuelCommandBundle): void => {
	bundle.commands.forEach((command) => {
		mergeFragmentToState(
			system.duel,
			runCommand({ duel: system.duel, command }),
		);
	});
};
