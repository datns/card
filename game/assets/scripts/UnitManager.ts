import Engine, { CardState } from '@metacraft/murg-engine';
import {
	_decorator,
	Component,
	Node,
	resources,
	Sprite,
	SpriteFrame,
	UIOpacity,
} from 'cc';

import { getVisualUri, setCursor } from './util/helper';
import { playSound } from './util/sound';
import { system } from './util/system';
import { CardManager } from './CardManager';
import { animateAttributeChange, raiseUnitPreview } from './tween';

const { ccclass } = _decorator;
const { getCard } = Engine;
const NodeEvents = Node.EventType;

@ccclass('UnitManager')
export class UnitManager extends Component {
	unsubscribe: () => void;
	cardId: string;
	uiOpacity: UIOpacity;
	cardFoil: Sprite;
	cardVisual: Sprite;
	cardAttack: Node;
	cardDefense: Node;
	cardHealth: Node;

	start(): void {
		this.uiOpacity = this.node.getComponent(UIOpacity);
		this.cardFoil = this.node.getChildByPath('front/foil').getComponent(Sprite);
		this.cardVisual = this.node
			.getChildByPath('front/visual')
			.getComponent(Sprite);
		this.cardAttack = this.node.getChildByPath('front/attack') as Node;
		this.cardDefense = this.node.getChildByPath('front/defense') as Node;
		this.cardHealth = this.node.getChildByPath('front/health') as Node;

		if (this.cardId) {
			this.subscribeCardChange();
		}

		this.node.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.node.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
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
		const card = getCard(system.duel.cardMap, state.id);

		if (state.health !== lastState?.health) {
			animateAttributeChange(
				this.cardHealth,
				state.health,
				card.attribute.health,
			);
		}

		if (state.attack !== lastState?.attack) {
			animateAttributeChange(
				this.cardAttack,
				state.attack,
				card.attribute.attack,
			);
		}

		if (state.defense !== lastState?.defense) {
			animateAttributeChange(
				this.cardDefense,
				state.defense,
				card.attribute.defense,
			);
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

	onMouseEnter(): void {
		setCursor('pointer');

		if (system.dragging || !this.cardId) return;
		if (this.node.getChildByPath('back')?.active) return;

		const cardNode = system.globalNodes.cardPreview.getChildByPath('Card');
		const glowNode = system.globalNodes.cardPreview.getChildByPath('Card/glow');

		glowNode.active = false;
		playSound('card-raise');
		cardNode.getComponent(CardManager).setCardId(this.cardId);
		raiseUnitPreview(system.globalNodes.cardPreview, this.node);
	}

	onMouseLeave(): void {
		setCursor('auto');
		system.globalNodes.cardPreview.setPosition(190, 740);
	}
}
