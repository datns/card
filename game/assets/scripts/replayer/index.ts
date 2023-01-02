import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { system } from '../util/system';

import { animateInitialDraw, animateTurnDraw } from './draw';
import { animateSummon } from './summon';
import { extractHistoryDiff } from './util';

const { BundleGroup, runCommand, mergeFragmentToState } = Engine;

export const synchronizeDuel = async (): Promise<void> => {
	const localHistory = system.history || [];
	const remoteHistory = system.serverState.history || [];
	const diff = extractHistoryDiff(localHistory, remoteHistory);

	for (let i = 0; i < diff.fragment.length; i++) {
		const bundle = diff.fragment[i] as DuelCommandBundle;
		const bundleGroup = bundle?.group;

		runCommandBundle(bundle);

		if (bundleGroup === BundleGroup.InitialDraw) {
			animateInitialDraw(bundle);
		} else if (bundleGroup === BundleGroup.TurnDraw) {
			animateTurnDraw(bundle);
		} else if (bundleGroup === BundleGroup.Summon) {
			animateSummon(bundle);
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
