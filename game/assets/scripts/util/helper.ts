import Engine, { DuelConfig, TemplateFragment } from '@metacraft/murg-engine';

import { PlayerIds } from './types';

const { ElementalType, ClassType } = Engine;

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
