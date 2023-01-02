import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate, UIOpacity } from 'cc';

import {
	fromDragToGroundAnimate,
	fromEnemyHandToGroundAnimate,
	groundAppearAnimate,
	simpleMove,
} from '../tween/card';
import { selectGroundNode, selectHandNode } from '../util/helper';
import { getGroundExpos, getHandExpos } from '../util/layout';
import { system } from '../util/system';

const { DuelCommandType, selectHand, DuelPlace } = Engine;

export const animateSummon = ({ commands }: DuelCommandBundle): void => {
	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];

		if (command.type === DuelCommandType.CardMove) {
			const { owner, target } = command;
			const isMySummon = owner === system.playerIds.me;
			const cardNode = system.cardRefs[target.from.id];
			const groundPositions = getGroundExpos(selectGroundNode(owner));
			const animator = isMySummon
				? fromDragToGroundAnimate
				: fromEnemyHandToGroundAnimate;
			const unitNode = instantiate(system.globalNodes.unitTemplate);

			unitNode.parent = system.globalNodes.board;
			unitNode.getComponent(UIOpacity).opacity = 255;

			animator(cardNode, groundPositions[target.to.index]).then(() => {
				unitNode.emit('data', target.from.id);
				unitNode.setPosition(cardNode.getPosition());

				groundAppearAnimate(unitNode);
				system.cardRefs[target.from.id] = unitNode;
				cardNode.destroy();
			});

			if (target.from.place === DuelPlace.Hand) {
				reArrangeHand(owner);
			}
		}
	}
};

export const reArrangeHand = (owner: string): void => {
	const handIds = selectHand(system.duel, owner);
	const handPositions = getHandExpos(selectHandNode(owner), handIds.length);

	for (let i = 0; i < handIds.length; i += 1) {
		const cardNode = system.cardRefs[handIds[i]];
		simpleMove(cardNode, handPositions[i]);
	}
};
