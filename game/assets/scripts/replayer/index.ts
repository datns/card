import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { system } from '../util/system';

import { animateCardDraw } from './draw';
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
		const isCardDrawBundle = cardDrawGroups.indexOf(bundleGroup) >= 0;

		runCommandBundle(bundle);

		if (isCardDrawBundle) {
			await animateCardDraw(bundle);
		} else if (bundleGroup === BundleGroup.Summon) {
			await animateSummon(bundle);
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
