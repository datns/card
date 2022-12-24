import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { extractHistoryDiff } from '../util/replayer';
import { system } from '../util/system';

import { runDraw } from './draw';

const { DuelPhases } = Engine;
export const replayDuel = async (): Promise<void> => {
	const localHistory = system.history || [];
	const remoteHistory = system.serverState.history || [];
	const diff = extractHistoryDiff(localHistory, remoteHistory);

	for (let i = 0; i < diff.fragment.length; i++) {
		const bundle = diff.fragment[i] as DuelCommandBundle;

		if (bundle?.phase === DuelPhases.Draw) {
			await runDraw(bundle);
		}
	}
};
