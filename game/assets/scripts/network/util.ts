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

	system.remoteHistory = system.remoteHistory.slice(0, level).concat(bundles);

	return {
		conflict: false,
	};
};
