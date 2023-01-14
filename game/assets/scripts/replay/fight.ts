import { DuelCommandBundle } from '@metacraft/murg-engine';

import { animateGroundReveal } from '../tween';
import { system } from '../util/system';

export const playFight = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	const revealTweens = [];
	const combatPromises = [];

	for (let i = 0; i < system.duel.setting.groundSize; i += 1) {
		const firstNode = system.cardRefs[system.duel.firstGround[i]];
		const secondNode = system.cardRefs[system.duel.secondGround[i]];

		[firstNode, secondNode]
			.filter((node) => node?.getChildByPath('back')?.active)
			.forEach((node) => {
				revealTweens.push(animateGroundReveal(node));
			});
	}

	await Promise.all(revealTweens);
};
