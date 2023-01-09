import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { animateCardAttack } from '../tween/fight';
import { system } from '../util/system';

const { CommandSourceType, DuelCommandType } = Engine;

export const animateFights = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const promises = [];

	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];
		const source = command.target?.source?.type;
		const isSourceByUnit = source === CommandSourceType.Unit;

		if (isSourceByUnit) {
			const fromCardId = command.target?.source?.id;
			const fromNode = system.cardRefs[fromCardId];
			const isPlayerAttack = command.type === DuelCommandType.PlayerMutate;

			if (fromNode) {
				promises.push(animateCardAttack(fromNode, isPlayerAttack));
			}
		}
	}

	await Promise.all(promises);
};
