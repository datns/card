import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate, UIOpacity } from 'cc';

import {
	fromDragToGroundAnimate,
	fromEnemyHandToGroundAnimate,
	groundAppearAnimate,
} from '../tween/card';
import { selectGroundNode } from '../util/helper';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

import { reArrangeHand } from './util';

const { DuelCommandType, DuelPlace } = Engine;

export const animateSummon = ({ commands }: DuelCommandBundle): void => {
	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];

		if (command.type === DuelCommandType.CardMove) {
			const { owner, target } = command;
			const toIndex = target.to.index;
			const isMySummon = owner === system.playerIds.me;
			const cardNode = system.cardRefs[target.from.id];
			const groundPositions = getGroundExpos(selectGroundNode(owner));
			const unitNode = instantiate(system.globalNodes.unitTemplate);

			unitNode.parent = system.globalNodes.board;
			unitNode.getComponent(UIOpacity).opacity = 255;
			system.cardRefs[target.from.id] = unitNode;

			if (isMySummon) {
				fromDragToGroundAnimate(cardNode, groundPositions[toIndex]).then(() => {
					cardNode.destroy();
					groundAppearAnimate(unitNode);
				});
			} else {
				unitNode.getChildByPath('front').active = false;
				cardNode.destroy();

				fromEnemyHandToGroundAnimate(
					unitNode,
					cardNode.getPosition(),
					groundPositions[toIndex],
				);
			}

			if (target.from.place === DuelPlace.Hand) {
				reArrangeHand(owner);
			}
		}
	}
};
