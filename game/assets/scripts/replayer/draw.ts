import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { animateDrawEnemyCard, animateDrawPlayerCard } from '../tween/card';
import { getExpoPositions } from '../util/layout';
import { system } from '../util/system';

const { mergeFragmentToState, runCommand, getCard } = Engine;

export const runInitialDraw = ({ commands }: DuelCommandBundle): void => {
	const isMyPhase = system.duel.phaseOf === system.playerIds.me;
	const fromPosition = isMyPhase
		? system.globalNodes.playerDeck.parent.getPosition()
		: system.globalNodes.enemyDeck.parent.getPosition();
	const expoPositions = getExpoPositions(commands.length);
	const handPositions = getExpoPositions(
		commands.length,
		isMyPhase ? system.globalNodes.playerHand : system.globalNodes.enemyHand,
		80,
	);

	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];
		const { owner, id: cardId } = command.target.from;
		const expoPosition = expoPositions[i];
		const handPosition = handPositions[i];
		const cardNode = instantiate(system.globalNodes.cardTemplate);

		cardNode.parent = system.globalNodes.board;
		system.cardRefs[cardId] = cardNode;

		mergeFragmentToState(
			system.duel,
			runCommand({ duel: system.duel, command }),
		);

		const card = getCard(system.duel.cardMap, cardId); // system.duel.map[cardId.substring(0, 9)];
		setTimeout(() => cardNode.emit('data', { cardId, owner, card }), 0);

		if (isMyPhase) {
			animateDrawPlayerCard({
				node: cardNode,
				from: fromPosition,
				dest: handPosition,
				expoDest: expoPosition,
				delay: i * 0.3,
			});
		} else {
			animateDrawEnemyCard({
				node: cardNode,
				from: fromPosition,
				dest: handPosition,
				delay: i * 0.2,
			});
		}
	}
};
