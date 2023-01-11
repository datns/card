import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate, UIOpacity } from 'cc';

import {
	animateFromDragToGround,
	animateFromEnemyHandToGround,
	animateGroundAppear,
} from '../tween';
import { UnitManager } from '../UnitManager';
import { selectGroundNode } from '../util/helper';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

const { DuelCommandType } = Engine;

export const animateSummon = ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	return new Promise((resolve) => {
		let completeCount = 0;
		const moveCommands = commands.filter(
			(i) => i.type === DuelCommandType.CardMove,
		);

		const onMoveComplete = () => {
			completeCount += 1;
			if (completeCount >= moveCommands.length) {
				resolve();
			}
		};

		for (let i = 0; i < moveCommands.length; i += 1) {
			const command = moveCommands[i];

			if (command.type === DuelCommandType.CardMove) {
				const { owner, target } = command;
				const cardId = target.from.id;
				const toIndex = target.to.index;
				const isMySummon = owner === system.playerIds.me;
				const cardNode = system.cardRefs[cardId];
				const groundPositions = getGroundExpos(selectGroundNode(owner));
				const unitNode = instantiate(system.globalNodes.unitTemplate);

				system.cardRefs[cardId] = unitNode;
				unitNode.getComponent(UnitManager).setCardId(cardId);
				unitNode.getComponent(UIOpacity).opacity = 255;
				unitNode.parent = system.globalNodes.board.getChildByPath('Ground');

				if (isMySummon) {
					const targetPosition = groundPositions[toIndex];

					unitNode.getChildByPath('back').active = false;
					animateFromDragToGround(cardNode, targetPosition).then(() => {
						cardNode?.destroy();
						unitNode.setPosition(targetPosition);
						animateGroundAppear(unitNode, targetPosition).then(onMoveComplete);
					});
				} else {
					cardNode.destroy();
					animateFromEnemyHandToGround(
						unitNode,
						cardNode.getPosition(),
						groundPositions[toIndex],
					).then(onMoveComplete);
				}
			}
		}
	});
};
