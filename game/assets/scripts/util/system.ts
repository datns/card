import { DuelCommandBundle, DuelState } from '@metacraft/murg-engine';
import { Node } from 'cc';

import { PlayerIds, ServerState } from '../util/types';

export interface System {
	jwt?: string;
	playerIds: PlayerIds;
	serverState?: ServerState;
	duel?: DuelState;
	history: DuelCommandBundle[];
	globalNodes: {
		duel?: Node;
		board?: Node;
		cardTemplate?: Node;
		cardPreview?: Node;
		unitTemplate?: Node;
		playerDeck?: Node;
		enemyDeck?: Node;
		expoCenter?: Node /* <- reference position for Exposing cards */;
		playerHand?: Node;
		playerGround?: Node;
		summonZone?: Node;
		enemyHand?: Node;
		enemyGround?: Node;
	};
	cardRefs: Record<string, Node>;
	previewing: boolean;
	dragging: boolean;
	activeCard?: Node;
}

export const system: System = {
	playerIds: {
		me: '',
		enemy: '',
	},
	cardRefs: {},
	globalNodes: {},
	history: [],
	previewing: false,
	dragging: false,
};
