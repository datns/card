import { _decorator, Animation, Component, instantiate, Node } from 'cc';

import { revealPlayerCard } from './tween/card';
import { system } from './util/system';

const { ccclass } = _decorator;

interface Props {
	animation?: Animation;
}

@ccclass('BoardManager')
export class BoardManager extends Component {
	animation: Animation;
	props: Props = {};

	start(): void {
		const cardTemplate = this.node.getChildByPath('Card Template') as Node;
		const playerDeck = this.node.getChildByPath('Player Deck/foil') as Node;
		const enemyDeck = this.node.getChildByPath('Enemy Deck/foil') as Node;

		this.animation = this.node.getComponent('cc.Animation') as Animation;
		system.board = this.node;
		system.cardTemplate = cardTemplate;
		system.playerDeck = playerDeck;
		system.enemyDeck = enemyDeck;

		this.animation.play('ground-reveal');
		this.distributeCard();
	}

	distributeCard(): void {
		const node = instantiate(system.cardTemplate);

		node.parent = this.node.parent;
		revealPlayerCard(node);
	}
}
