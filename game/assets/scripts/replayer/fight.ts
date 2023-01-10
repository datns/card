import Engine, { DuelCommand, DuelCommandBundle } from '@metacraft/murg-engine';

import { animateGroundReveal } from '../tween/card';
import { animateCardAttack, animateCardDeath } from '../tween/fight';
import { system } from '../util/system';

const { CommandSourceType, DuelCommandType, DuelPlace } = Engine;

export const animateFights = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const revealPromises = [];
	const combatPromises = [];
	const deathCommands = commands.filter(filterDeath);

	for (let i = 0; i < system.duel.setting.groundSize; i += 1) {
		const firstNode = system.cardRefs[system.duel.firstGround[i]];
		const secondNode = system.cardRefs[system.duel.secondGround[i]];

		if (firstNode?.getChildByPath('back')?.active) {
			revealPromises.push(animateGroundReveal(firstNode));
		}

		if (secondNode?.getChildByPath('back')?.active) {
			revealPromises.push(animateGroundReveal(secondNode));
		}
	}

	deathCommands.forEach((command) => {
		const cardNode = system.cardRefs[command.target?.from?.id];

		if (cardNode?.getChildByPath('back')?.active) {
			revealPromises.push(animateGroundReveal(cardNode));
		}
	});

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

	const deathPromises = deathCommands
		.map((command) => {
			const cardNode = system.cardRefs[command.target.from.id];
			if (cardNode) return animateCardDeath(cardNode);

			return false;
		})
		.filter((i) => i);

	await Promise.all(deathPromises);
};

const filterDeath = (command: DuelCommand) => {
	const isCardMove = command.type === DuelCommandType.CardMove;
	const fromGround = command.target.from?.place === DuelPlace.Ground;
	const toGrave = command.target.to?.place === DuelPlace.Grave;

	return isCardMove && fromGround && toGrave;
};
