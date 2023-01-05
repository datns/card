import Engine, { DuelCommand, DuelCommandBundle } from '@metacraft/murg-engine';
import isEqual from 'lodash.isequal';

import { simpleMove } from '../tween/card';
import { selectHandNode } from '../util/helper';
import { getHandExpos } from '../util/layout';
import { system } from '../util/system';

const { selectHand, runCommand, mergeFragmentToState } = Engine;

export interface HistoryDiff {
	isConsist: boolean;
	writeToHistory?: boolean;
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
			writeToHistory: true,
			fragment: remoteHistory.slice(localHistory.length),
		};
	} else if (localHistory.length > remoteHistory.length) {
		/* <- local ahead remote */
		const localHistoryFragment = localHistory.slice(0, remoteHistory.length);

		return {
			isConsist: isEqual(localHistoryFragment, remoteHistory),
			fragment: localHistory.slice(remoteHistory.length),
		};
	} else {
		/* <- local have equal length as remote */
		return {
			isConsist: isEqual(localHistory, remoteHistory),
			fragment: [],
		};
	}
};

export const runAndMergeCommand = (command: DuelCommand): void => {
	mergeFragmentToState(system.duel, runCommand({ duel: system.duel, command }));
};

export const reArrangeHand = (owner: string): void => {
	const handIds = selectHand(system.duel, owner);
	const handPositions = getHandExpos(selectHandNode(owner), handIds.length);

	for (let i = 0; i < handIds.length; i += 1) {
		const cardNode = system.cardRefs[handIds[i]];
		simpleMove(cardNode, handPositions[i]);
	}
};
