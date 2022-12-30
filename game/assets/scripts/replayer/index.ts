import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import isEqual from 'lodash.isequal';

import { system } from '../util/system';

import { runInitialDraw } from './draw';

const { BundleGroup, runCommand, mergeFragmentToState } = Engine;

export const replayDuel = async (): Promise<void> => {
	const localHistory = system.history || [];
	const remoteHistory = system.serverState.history || [];
	const diff = extractHistoryDiff(localHistory, remoteHistory);

	for (let i = 0; i < diff.fragment.length; i++) {
		const bundle = diff.fragment[i] as DuelCommandBundle;

		if (bundle?.group === BundleGroup.InitialDraw) {
			await runInitialDraw(bundle);
		} else {
			runCommandBundle(bundle);
		}
	}
};

export const runCommandBundle = (bundle: DuelCommandBundle): void => {
	try {
		bundle.commands.forEach((command) => {
			mergeFragmentToState(
				system.duel,
				runCommand({ duel: system.duel, command }),
			);
		});
	} catch (e) {
		console.log(e);
	}
};

export interface HistoryDiff {
	isConsist: boolean;
	fragment: DuelCommandBundle[];
}

export const extractHistoryDiff = (
	localHistory: DuelCommandBundle[],
	remoteHistory: DuelCommandBundle[],
): HistoryDiff => {
	if (localHistory.length < remoteHistory.length) {
		/* <- local behind remote, need to keep up by replay missing fragment */
		const remoteHistoryFragment = remoteHistory.slice(0, localHistory.length);

		return {
			isConsist: isEqual(remoteHistoryFragment, localHistory),
			fragment: remoteHistory.slice(localHistory.length),
		};
	} else if (remoteHistory.length > localHistory.length) {
		/* <- local ahead remote */
		const localHistoryFragment = localHistory.slice(0, remoteHistory.length);

		return {
			isConsist: isEqual(localHistoryFragment, remoteHistory),
			fragment: [],
		};
	} else {
		/* <- local have equal length as remote */
		return {
			isConsist: isEqual(localHistory, remoteHistory),
			fragment: [],
		};
	}
};
