import Engine, { DuelConfig, TemplateFragment } from '@metacraft/murg-engine';
import { Node, Vec2, Vec3 } from 'cc';

import { CardManager } from '../CardManager';

import { system } from './system';
import { PlayerIds } from './types';

const { ElementalType, ClassType, selectHand, selectGround } = Engine;

export const extractPlayerIds = (duel: DuelConfig, myId: string): PlayerIds => {
	if (myId === duel.firstPlayer.id) {
		return {
			me: duel.firstPlayer.id,
			enemy: duel.secondPlayer.id,
		};
	} else {
		return {
			me: duel.secondPlayer.id,
			enemy: duel.firstPlayer.id,
		};
	}
};

export const cardIdFromNode = (node: Node): string => {
	return node.getComponent(CardManager)?.cardId;
};

export const delay = (seconds = 0): Promise<void> => {
	return new Promise((resolve) => {
		setTimeout(() => {
			resolve();
		}, seconds);
	});
};

export const getVisualUri = (cardId: string): string => {
	return `graphic/visuals/${cardId.substring(0, 5)}/spriteFrame`;
};

export const getFoilUri = (cardId: string): string => {
	const elemental = cardId.substring(7, 9);

	switch (elemental) {
		case ElementalType.Metal:
			return `graphic/cards/foil-metal/spriteFrame`;
		case ElementalType.Wood:
			return `graphic/cards/foil-wood/spriteFrame`;
		case ElementalType.Water:
			return `graphic/cards/foil-water/spriteFrame`;
		case ElementalType.Fire:
			return `graphic/cards/foil-fire/spriteFrame`;
		case ElementalType.Earth:
			return `graphic/cards/foil-earth/spriteFrame`;
		case ElementalType.Dark:
			return `graphic/cards/foil-dark/spriteFrame`;
		case ElementalType.Light:
			return `graphic/cards/foil-light/spriteFrame`;
		default:
			return `graphic/cards/foil-metal/spriteFrame`;
	}
};

export const getClassUri = (classId: string): string => {
	switch (classId) {
		case ClassType.Knight:
			return `graphic/cards/class-tank/spriteFrame`;
		case ClassType.Wizard:
			return `graphic/cards/class-wizard/spriteFrame`;
		case ClassType.Assassin:
			return `graphic/cards/class-assassin/spriteFrame`;
		case ClassType.Summoner:
			return `graphic/cards/class-summoner/spriteFrame`;
		default:
			return `graphic/cards/class-tank/spriteFrame`;
	}
};

export const getSkillDesc = (fragments: TemplateFragment[]): string => {
	const inner = fragments
		.map((fragment) => {
			if (fragment.style) {
				const color = fragment.style.color || '#111111';
				return `<color=${color}>${fragment.text}</color>`;
			}

			return fragment.text;
		})
		.join('');

	return `<color=#222222>${inner}</color>`;
};

export const setCursor = (cursor: string): void => {
	const canvas = document?.getElementById?.('GameCanvas');
	if (!canvas) return;
	canvas.style.cursor = cursor;
};

export const designScreenSize = new Vec2(1280, 720);

export const extractMouseLocation = ({ x, y }: Vec2): Vec3 => {
	return new Vec3(x - designScreenSize.x / 2, y - designScreenSize.y / 2, 0);
};

export const getGroundSize = (): number => {
	return system.duel.setting?.groundSize;
};

export const selectDeckNode = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerDeck
		: system.globalNodes.enemyDeck;
};

export const selectGroundNode = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerGround
		: system.globalNodes.enemyGround;
};

export const selectHandNode = (owner: string): Node => {
	return system.playerIds.me === owner
		? system.globalNodes.playerHand
		: system.globalNodes.enemyHand;
};

export const getHandSize = (owner: string): number => {
	return selectHand(system.duel, owner)?.length;
};

export const getMyHandSize = (): number => {
	return getHandSize(system.playerIds.me);
};

export const getMyGround = (): string[] => {
	return selectGround(system.duel, system.playerIds.me);
};
