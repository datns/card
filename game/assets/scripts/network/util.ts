import { DuelCommandBundle } from '@metacraft/murg-engine';

import { system } from '../util/system';

export const connectionInstance = new WebSocket('ws://localhost:3006');

export interface MergeHistoryResult {
	conflict: boolean;
}

export const mergeRemoteHistory = (
	bundles: DuelCommandBundle[],
	level: number,
): MergeHistoryResult => {
	if (system.remoteHistory.length < level) {
		return { conflict: true };
	}

	const nextHistory = system.remoteHistory.slice(0, level).concat(bundles);

	system.remoteHistory = nextHistory;

	return {
		conflict: false,
	};
};
