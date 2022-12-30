import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { instantiate, UIOpacity } from 'cc';

import { fromDragToGroundAnimate } from '../tween/card';
import { selectGroundNode } from '../util/helper';
import { getGroundExpos } from '../util/layout';
import { system } from '../util/system';

const { DuelCommandType } = Engine;

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
					system.cardRefs[target.from.id] = unitNode;
					cardNode.destroy();
				},
			);
		}
	}
};
