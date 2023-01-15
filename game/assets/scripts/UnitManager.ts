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

import { getFoilUri, getVisualUri, setCursor } from './util/helper';
import { playSoundOnce } from './util/sound';
import { system } from './util/system';
import { CardManager } from './CardManager';
import { animateAttributeChange, raiseUnitPreview } from './tween';

const { ccclass } = _decorator;
const { getCard, extractPassivePair, getFacingIdentifier } = Engine;
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
		const facing = getFacingIdentifier(system.duel, state.owner, state.id);
		const passiveAttr = extractPassivePair(system.duel, state.id, facing.id)[0];
		const attack = state.attack + passiveAttr.attack;
		const defense = state.defense + passiveAttr.defense;
		const health = state.health + passiveAttr.health;

		if (state.health !== lastState?.health) {
			animateAttributeChange(this.cardHealth, health, card.attribute.health);
		}

		if (state.attack !== lastState?.attack) {
			animateAttributeChange(this.cardAttack, attack, card.attribute.attack);
		}

		if (state.defense !== lastState?.defense) {
			animateAttributeChange(this.cardDefense, defense, card.attribute.defense);
		}

		if (!lastState) {
			const visualUri = getVisualUri(card.id);
			const foilUri = getFoilUri(card.id, '-ground');

			resources.load(visualUri, (err, spriteFrame: SpriteFrame) => {
				if (!err) {
					this.cardVisual.spriteFrame = spriteFrame;
				}
			});

			resources.load(foilUri, (err, spriteFrame: SpriteFrame) => {
				console.log(err);
				if (!err) {
					this.cardFoil.spriteFrame = spriteFrame;
				}
			});
		}
	}

	onMouseEnter(): void {
		setCursor('pointer');

		if (system.winner || system.dragging || !this.cardId) return;
		if (this.node.getChildByPath('back')?.active) return;

		const cardNode = system.globalNodes.cardPreview.getChildByPath('Card');
		const glowNode = system.globalNodes.cardPreview.getChildByPath('Card/glow');

		glowNode.active = false;
		playSoundOnce('card-raise', 0.2);
		raiseUnitPreview(system.globalNodes.cardPreview, this.node);
		cardNode.getComponent(CardManager).setCardId(this.cardId.substring(0, 9));
	}

	onMouseLeave(): void {
		setCursor('auto');
		system.globalNodes.cardPreview.setPosition(190, 740);
	}
}
