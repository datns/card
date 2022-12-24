import { DuelCommandBundle, DuelState } from '@metacraft/murg-engine';
import { Node, Vec2, Vec3 } from 'cc';

import { PlayerIds, ServerState } from '../util/types';

const screenSize = new Vec2(1280, 720);

export interface System {
	playerIds: PlayerIds;
	serverState?: ServerState;
	duel?: DuelState;
	history: DuelCommandBundle[];
	globalNodes: {
		duel?: Node;
		board?: Node;
		cardTemplate?: Node;
		cardPreview?: Node;
		playerDeck?: Node;
		enemyDeck?: Node;
		expoCenter?: Node /* <- reference position for Exposing cards */;
		playerHand?: Node;
		enemyHand?: Node;
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

export const setCursor = (cursor: string): void => {
	const canvas = document?.getElementById?.('GameCanvas');
	if (!canvas) return;
	canvas.style.cursor = cursor;
};

export const extractMouseLocation = ({ x, y }: Vec2): Vec3 => {
	return new Vec3(x - screenSize.x / 2, y - screenSize.y / 2, 0);
};
