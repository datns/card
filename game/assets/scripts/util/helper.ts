import { DuelConfig } from '@metacraft/murg-engine';

import { PlayerIds } from './types';

export const extractPlayerIds = (
	myId: string,
	{ firstPlayer, secondPlayer }: DuelConfig,
): PlayerIds => {
	if (myId === firstPlayer.id) {
		return {
			me: firstPlayer.id,
			enemy: secondPlayer.id,
		};
	} else {
		return {
			me: secondPlayer.id,
			enemy: firstPlayer.id,
		};
	}
};
