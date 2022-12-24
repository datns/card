import { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate } from 'cc';

import { revealPlayerCard } from '../tween/card';
import { getExpoPositions } from '../util/layout';
import { system } from '../util/system';

export const runDraw = ({
	phaseOf,
	commands,
	turn,
}: DuelCommandBundle): void => {
	const initialDistribute = turn === 0;
	const isMyPhase = phaseOf === system.playerIds.me;

	if (initialDistribute) {
		if (isMyPhase) {
			const fromPosition = system.globalNodes.playerDeck.parent.getPosition();
			const expoPositions = getExpoPositions(commands.length);
			const handPositions = getExpoPositions(
				commands.length,
				system.globalNodes.playerHand,
				80,
			);

			for (let i = 0; i < commands.length; i += 1) {
				const expoPosition = expoPositions[i];
				const handPosition = handPositions[i];
				const card = instantiate(system.globalNodes.cardTemplate);

				card.parent = system.globalNodes.board;
				revealPlayerCard({
					node: card,
					from: fromPosition,
					dest: handPosition,
					expoDest: expoPosition,
					delay: i * 0.3,
				});
			}
		}
	}
};
