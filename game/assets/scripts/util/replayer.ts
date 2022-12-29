import { DuelCommandBundle } from '@metacraft/murg-engine';
import isEqual from 'lodash.isequal';

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
