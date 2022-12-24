import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { animateDrawEnemyCard, animateDrawPlayerCard } from '../tween/card';
import { getExpoPositions } from '../util/layout';
import { system } from '../util/system';

const { runCommand } = Engine;

export const runDraw = ({
	phaseOf,
	commands,
	turn,
}: DuelCommandBundle): void => {
	const initialDistribute = turn === 0;
	const isMyPhase = phaseOf === system.playerIds.me;

	if (initialDistribute) {
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
			const node = instantiate(system.globalNodes.cardTemplate);

			node.parent = system.globalNodes.board;
			system.cardRefs[cardId] = node;
			system.duel = {
				...system.duel,
				...runCommand({ state: system.duel, command }),
			};

			const card = system.duel.map[cardId.substring(0, 9)];
			setTimeout(() => node.emit('data', { owner, card }), 0);

			if (isMyPhase) {
				animateDrawPlayerCard({
					node,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.3,
				});
			} else {
				animateDrawEnemyCard({
					node,
					from: fromPosition,
					dest: handPosition,
					delay: i * 0.2,
				});
			}
		}
	}
};
