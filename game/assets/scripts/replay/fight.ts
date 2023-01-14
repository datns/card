import Engine, { DuelCommand, DuelCommandBundle } from '@metacraft/murg-engine';
import lodash from 'lodash';

import { animateCardAttack } from '../tween';
import { system } from '../util/system';

const { CommandSourceType, DuelCommandType, DuelPlace } = Engine;

export const playFight = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const combatTweens = [];
	const unitCommands = commands.filter(filterUnitSourced);
	const deathIds = commands.filter(filterDeath).map((i) => i.target.from?.id);

	lodash
		.uniqBy(unitCommands, (i) => i.target?.source?.id)
		.forEach(({ target }, i) => {
			const fromCardId = target.source.id;
			const fromNode = system.cardRefs[fromCardId];
			const isDeath = deathIds.findIndex((i) => i === fromCardId) >= 0;

			if (fromNode) {
				combatTweens.push(animateCardAttack(fromNode, isDeath, i));
			}
		});

	await Promise.all(combatTweens);
};

const filterUnitSourced = (i) => {
	return i.target?.source?.type === CommandSourceType.Unit;
};

const filterDeath = (command: DuelCommand) => {
	const isCardMove = command.type === DuelCommandType.CardMove;
	const fromGround = command.target.from?.place === DuelPlace.Ground;
	const toGrave = command.target.to?.place === DuelPlace.Grave;

	return isCardMove && fromGround && toGrave;
};
