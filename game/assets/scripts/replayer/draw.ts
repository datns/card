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
			const expoPosition = expoPositions[i];
			const handPosition = handPositions[i];
			const card = instantiate(system.globalNodes.cardTemplate);

			card.parent = system.globalNodes.board;
			system.cardRefs[command.target.from.id] = card;
			system.duel = {
				...system.duel,
				...runCommand({ state: system.duel, command }),
			};

			if (isMyPhase) {
				animateDrawPlayerCard({
					node: card,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.3,
				});
			} else {
				animateDrawEnemyCard({
					node: card,
					from: fromPosition,
					dest: handPosition,
					delay: i * 0.2,
				});
			}
		}
	}
};
