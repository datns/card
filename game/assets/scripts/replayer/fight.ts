import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { animateGroundReveal } from '../tween/card';
import { animateCardAttack } from '../tween/fight';
import { system } from '../util/system';

const { CommandSourceType, DuelCommandType } = Engine;

export const animateFights = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const revealPromises = [];
	const combatPromises = [];

	for (let i = 0; i < system.duel.setting.groundSize; i += 1) {
		const firstNode = system.cardRefs[system.duel.firstGround[i]];
		const secondNode = system.cardRefs[system.duel.secondGround[i]];

		console.log(i, firstNode?.active, secondNode?.active);
		if (firstNode?.getChildByPath('back').active) {
			revealPromises.push(animateGroundReveal(firstNode));
		}

		if (secondNode?.getChildByPath('back').active) {
			revealPromises.push(animateGroundReveal(secondNode));
		}
	}

	await Promise.all(revealPromises);

	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];
		const source = command.target?.source?.type;
		const isSourceByUnit = source === CommandSourceType.Unit;

		if (isSourceByUnit) {
			const fromCardId = command.target?.source?.id;
			const fromNode = system.cardRefs[fromCardId];
			const isPlayerAttack = command.type === DuelCommandType.PlayerMutate;

			if (fromNode) {
				combatPromises.push(animateCardAttack(fromNode, isPlayerAttack));
			}
		}
	}

	await Promise.all(combatPromises);
};
