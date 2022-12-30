import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate, UIOpacity } from 'cc';

import {
	fromDragToGroundAnimate,
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
			const cardNode = system.cardRefs[target.from.id];
			const expoPositions = getGroundExpos(selectGroundNode(owner));

			fromDragToGroundAnimate(cardNode, expoPositions[target.to.index]).then(
				() => {
					const unitNode = instantiate(system.globalNodes.unitTemplate);

					unitNode.parent = system.globalNodes.board;
					unitNode.getComponent(UIOpacity).opacity = 255;
					unitNode.setPosition(cardNode.getPosition());

					groundAppearAnimate(unitNode);
					system.cardRefs[target.from.id] = unitNode;
					cardNode.destroy();
				},
			);

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
