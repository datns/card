import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { animateDrawEnemyCard, animateDrawPlayerCard } from '../tween/card';
import { selectDeckNode, selectHandNode } from '../util/helper';
import { getDistributeExpos, getHandExpos } from '../util/layout';
import { system } from '../util/system';

const { getCard } = Engine;

export const animateInitialDraw = ({ commands }: DuelCommandBundle): void => {
	const fromPosition = selectDeckNode(system.duel.phaseOf).parent.getPosition();
	const expoPositions = getDistributeExpos(commands.length);
	const handPositions = getHandExpos(
		selectHandNode(system.duel.phaseOf),
		commands.length,
	);

	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];
		const { owner, id: cardId } = command.target.from;
		const expoPosition = expoPositions[i];
		const handPosition = handPositions[i];
		const cardNode = instantiate(system.globalNodes.cardTemplate);

		cardNode.parent = system.globalNodes.board;
		system.cardRefs[cardId] = cardNode;

		const card = getCard(system.duel.cardMap, cardId); // system.duel.map[cardId.substring(0, 9)];
		setTimeout(() => cardNode.emit('data', { cardId, owner, card }), 0);

		if (system.duel.phaseOf === system.playerIds.me) {
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
