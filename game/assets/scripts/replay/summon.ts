import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { animatePlayerSummon } from '../tween';
import { selectGroundNode } from '../util/helper';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

const { DuelCommandType } = Engine;

export const playSummon = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const promises = [];

	for (let i = 0; i < commands.length; i += 1) {
		const { type, owner, target } = commands[i];
		const isMoveCommand = type === DuelCommandType.CardMove;

		if (isMoveCommand) {
			const cardId = target.from.id;
			const isMyCommand = owner === system.playerIds.me;
			const cardNode = system.cardRefs[cardId];
			const groundPositions = getGroundExpos(selectGroundNode(owner));

			if (isMyCommand) {
				promises.push(
					animatePlayerSummon(
						cardId,
						cardNode,
						groundPositions[target.to.index],
					),
				);
			}
		}
	}

	await Promise.all(promises);
};
