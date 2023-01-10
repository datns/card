import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { simpleMove } from '../tween/card';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

const { DuelCommandType } = Engine;

export const animateReinforces = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const promises = [];

	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];
		const isCardMove = command.type === DuelCommandType.CardMove;

		if (isCardMove) {
			const cardNode = system.cardRefs[command.target?.from?.id];

			if (cardNode) {
				const isMyCommand = system.playerIds.me === command.owner;
				const expoNode = isMyCommand
					? system.globalNodes.playerGround
					: system.globalNodes.enemyGround;
				const expos = getGroundExpos(expoNode);

				promises.push(simpleMove(cardNode, expos[command.target.to.index]));
			}
		}
	}

	await Promise.all(promises);
};
