import { _decorator, Animation, Component, instantiate, Node } from 'cc';

const { ccclass } = _decorator;

interface Props {
	animation?: Animation;
	cardTemplate?: Node;
	playerFoil?: Node;
	enemyFoil?: Node;
}

@ccclass('BoardManager')
export class BoardManager extends Component {
	props: Props = {};

	start(): void {
		const animation = this.node.getComponent('cc.Animation') as Animation;
		const cardTemplate = this.node.getChildByPath('Card Template') as Node;
		const playerFoil = this.node.getChildByPath('Player Deck/foil') as Node;
		const enemyFoil = this.node.getChildByPath('Enemy Deck/foil') as Node;

		this.props = {
			animation,
			cardTemplate,
			playerFoil,
			enemyFoil,
		};

		animation.play('ground-reveal');
		this.distributeCard();
	}

	distributeCard(): void {
		const { cardTemplate } = this.props;
		const node = instantiate(cardTemplate);
		node.parent = this.node.parent;
		const cardAnimate = node.getComponent('cc.Animation') as Animation;
		cardAnimate.play('deck-to-hand');
	}
}
