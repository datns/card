import { CardState } from '@metacraft/murg-engine';
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

@ccclass('UnitManager')
export class UnitManager extends Component {
	unsubscribe: () => void;
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

		if (this.cardId) {
			this.subscribeCardChange();
		}
	}

	setCardId(id: string): void {
		if (id === this.cardId) return;
		this.cardId = id;
		this.subscribeCardChange();
	}

	subscribeCardChange(): void {
		this.unsubscribe?.();
		this.unsubscribe = system.duel.subscribe(
			`state#${this.cardId}`,
			this.onStateChange.bind(this),
			true,
		);
	}

	onStateChange(state: CardState, lastState: CardState): void {
		if (!this.cardFoil) return;

		if (state.health !== lastState?.health) {
			this.cardHealth.string = String(state.health);
		}

		if (state.attack !== lastState?.attack) {
			this.cardAttack.string = String(state.attack);
		}

		if (state.defense !== lastState?.defense) {
			this.cardDefense.string = String(state.defense);
		}

		if (!lastState) {
			const visualUri = getVisualUri(state.id.substring(0, 9));
			resources.load(visualUri, (err, spriteFrame: SpriteFrame) => {
				if (!err) {
					this.cardVisual.spriteFrame = spriteFrame;
				}
			});
		}
	}
}
