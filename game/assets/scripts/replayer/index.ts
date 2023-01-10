import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { animateFights } from 'db://assets/scripts/replayer/fight';
import { animateRibbonAppear } from 'db://assets/scripts/tween/hud';

import { system } from '../util/system';

import { animateCardDraw } from './draw';
import { animateReinforces } from './reinforce';
import { animateSummon } from './summon';
import { extractHistoryDiff } from './util';

const { BundleGroup, runCommand, mergeFragmentToState } = Engine;

const cardDrawGroups = [BundleGroup.InitialDraw, BundleGroup.TurnDraw];

export const synchronizeDuel = async (): Promise<void> => {
	const localHistory = system.history || [];
	const remoteHistory = system.serverState.history || [];
	const diff = extractHistoryDiff(localHistory, remoteHistory);

	for (let i = 0; i < diff.fragment.length; i++) {
		const bundle = diff.fragment[i] as DuelCommandBundle;
		const bundleGroup = bundle?.group;
		const isMyPhase = bundle.phaseOf === system.playerIds.me;
		const isCardDrawBundle = cardDrawGroups.indexOf(bundleGroup) >= 0;
		const isTurnDraw = bundleGroup === BundleGroup.TurnDraw;

		runCommandBundle(bundle);

		if (isTurnDraw) {
			if (isMyPhase) {
				await animateRibbonAppear('Your Turn');
			}

			await animateCardDraw(bundle);
		} else if (isCardDrawBundle) {
			await animateCardDraw(bundle);
		} else if (bundleGroup === BundleGroup.Summon) {
			await animateSummon(bundle);
		} else if (bundleGroup === BundleGroup.FightCombat) {
			await animateFights(bundle);
		} else if (bundleGroup === BundleGroup.Reinforce) {
			await animateReinforces(bundle);
		}

		if (diff.writeToHistory) {
			system.history.push(bundle);
		}
	}
};

export const runCommandBundle = (bundle: DuelCommandBundle): void => {
	bundle.commands.forEach((command) => {
		mergeFragmentToState(
			system.duel,
			runCommand({ duel: system.duel, command }),
		);
	});
};
