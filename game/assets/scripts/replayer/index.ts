import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { extractHistoryDiff } from '../util/replayer';
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
