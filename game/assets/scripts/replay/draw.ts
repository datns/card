import Engine, { DuelCommandBundle, DuelState } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { CardManager } from '../CardManager';
import { animateDrawEnemyCard, animateDrawPlayerCard } from '../tween';
import { selectDeckNode, selectHandNode } from '../util/helper';
import { getCenterExpos, getHandExpos, getRightExpos } from '../util/layout';
import { system } from '../util/system';

const { selectHand } = Engine;

export const replayDraw = async ({
	phaseOf,
	commands,
}: DuelCommandBundle): Promise<void> => {
	const promises = [];
	const hand = selectHand(system.duel, phaseOf);
	const fromPosition = selectDeckNode(phaseOf).parent.getPosition();
	const handPositions = getHandExpos(selectHandNode(phaseOf), hand.length);
	const expoCreator = commands.length > 3 ? getCenterExpos : getRightExpos;
	const expoPositions = expoCreator(commands.length);

	for (let i = 0; i < commands.length; i += 1) {
		const handIndex = hand.length - commands.length + i;
		const cardId = hand[handIndex];
		const handPosition = handPositions[handIndex];
		const expoPosition = expoPositions[i];
		const node = instantiate(system.globalNodes.cardTemplate);

		node.getComponent(CardManager).setCardId(cardId);
		node.parent = system.globalNodes.playerHand;
		system.cardRefs[cardId] = node;

		if (phaseOf === system.playerIds.me) {
			promises.push(
				animateDrawPlayerCard({
					node,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.2,
				}),
			);
		} else {
			promises.push(
				animateDrawEnemyCard({
					node,
					from: fromPosition,
					dest: handPosition,
					delay: i * 0.2,
				}),
			);
		}
	}

	await Promise.all(promises);

	// const expoCreator = commands.length > 3 ? getCenterExpos : getRightExpos;
	// const expoPositions = expoCreator(commands.length);
};

export const safeCardId = (duel: DuelState, id: string): string => {
	if (id.indexOf('#') >= 0) return id;
	return `${id}#${duel.uniqueCardCount}`;
};
