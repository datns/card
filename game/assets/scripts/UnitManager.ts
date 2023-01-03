import Engine from '@metacraft/murg-engine';
import {
	_decorator,
	Component,
	Label,
	resources,
	Sprite,
	SpriteFrame,
	UIOpacity,
} from 'cc';

import { getVisualUri } from './util/helper';
import { system } from './util/system';

const { ccclass } = _decorator;
const { getCard, getCardState } = Engine;

@ccclass('UnitManager')
export class UnitManager extends Component {
	cardId: string;
	uiOpacity: UIOpacity;
	cardFoil: Sprite;
	cardVisual: Sprite;
	cardAttack: Label;
	cardDefense: Label;
	cardHealth: Label;

	start(): void {
		this.uiOpacity = this.node.getComponent(UIOpacity);
		this.cardFoil = this.node.getChildByPath('front/foil').getComponent(Sprite);
		this.cardVisual = this.node
			.getChildByPath('front/visual')
			.getComponent(Sprite);
		this.cardAttack = this.node
			.getChildByPath('front/attack')
			.getComponent(Label);
		this.cardDefense = this.node
			.getChildByPath('front/defense')
			.getComponent(Label);
		this.cardHealth = this.node
			.getChildByPath('front/health')
			.getComponent(Label);

		this.node.on('data', (cardId: string) => {
			this.cardId = cardId;
			this.renderAll();
		});
	}

	renderAll(): void {
		const card = getCard(system.duel.cardMap, this.cardId);
		const state = getCardState(system.duel.stateMap, this.cardId);

		this.cardAttack.string = String(state.attack);
		this.cardDefense.string = String(state.defense);
		this.cardHealth.string = String(state.health);

		resources.load(getVisualUri(card.id), (err, spriteFrame: SpriteFrame) => {
			if (!err) {
				this.cardVisual.spriteFrame = spriteFrame;
			}
		});
	}
}
