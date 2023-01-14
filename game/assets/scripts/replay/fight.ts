import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import lodash from 'lodash';

import { animateCardAttack } from '../tween';
import { system } from '../util/system';

const { CommandSourceType } = Engine;

export const playFight = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const combatTweens = [];
	const unitCommands = commands.filter(
		(i) => i.target?.source?.type === CommandSourceType.Unit,
	);

	lodash
		.uniqBy(unitCommands, (i) => i.target?.source?.id)
		.forEach(({ target }, i) => {
			const fromCardId = target.source.id;
			const fromNode = system.cardRefs[fromCardId];

			if (fromNode) {
				combatTweens.push(animateCardAttack(fromNode, i));
			}
		});

	await Promise.all(combatTweens);
};
