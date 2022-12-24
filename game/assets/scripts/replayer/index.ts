import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import isEqual from 'lodash.isequal';

import { system } from '../util/system';

import { runDraw } from './draw';

const { DuelPhases } = Engine;
export const replayDuel = async (): Promise<void> => {
	const localHistory = system.history || [];
	const remoteHistory = system.serverState.history || [];
	const isConsistent = isHistoryConsistent(localHistory, remoteHistory);

	for (let i = localHistory.length; i < remoteHistory.length; i++) {
		const bundle = remoteHistory[i] as DuelCommandBundle;

		if (bundle?.phase === DuelPhases.Draw) {
			await runDraw(bundle);
		}
	}
};

const isHistoryConsistent = (
	localHistory: DuelCommandBundle[],
	remoteHistory: DuelCommandBundle[],
) => {
	if (localHistory.length > remoteHistory.length) {
		/* <- ahead remote, ahead frag */
		const localHistoryFragment = localHistory.slice(0, remoteHistory.length);

		return isEqual(localHistoryFragment, remoteHistory);
	} else if (remoteHistory.length > localHistory.length) {
		/* <- will need to keep up, by replay missing fragment */
		const remoteHistoryFragment = remoteHistory.slice(0, localHistory.length);

		return isEqual(remoteHistoryFragment, localHistory);
	} else {
		return isEqual(localHistory, remoteHistory);
	}
};
