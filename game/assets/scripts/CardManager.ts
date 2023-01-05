import Engine, { CardState } from '@metacraft/murg-engine';
import {
	_decorator,
	Animation,
	Component,
	Label,
	Node,
	resources,
	RichText,
	Sprite,
	SpriteFrame,
	UIOpacity,
} from 'cc';

import { playAnimation } from './util/animation';
import {
	getClassUri,
	getFoilUri,
	getSkillDesc,
	getVisualUri,
	setCursor,
} from './util/helper';
import { system } from './util/system';

const { ccclass } = _decorator;
const { getCard } = Engine;

@ccclass('CardManager')
export class CardManager extends Component {
	unsubscribe: () => void;
	isMouseInside = false;
	cardId: string;
	animation: Animation;
	uiOpacity: UIOpacity;
	cardFront: Node;
	cardName: Label;
	cardHealth: Label;
	cardDefense: Label;
	cardAttack: Label;
	cardSkill: RichText;
	cardFoil: Sprite;
	cardVisual: Sprite;
	cardClass: Sprite;

	start(): void {
		this.cardFront = this.node.getChildByPath('front');
		this.animation = this.node.getComponent(Animation);
		this.uiOpacity = this.node.getComponent(UIOpacity);
		this.cardName = this.node.getChildByPath('front/name').getComponent(Label);
		this.cardAttack = this.node
			.getChildByPath('front/attack')
			.getComponent(Label);
		this.cardDefense = this.node
			.getChildByPath('front/defense')
			.getComponent(Label);
		this.cardHealth = this.node
			.getChildByPath('front/health')
			.getComponent(Label);
		this.cardSkill = this.node
			.getChildByPath('front/skill')
			.getComponent(RichText);
		this.cardFoil = this.node.getChildByPath('front/foil').getComponent(Sprite);
		this.cardVisual = this.node
			.getChildByPath('front/visual')
			.getComponent(Sprite);
		this.cardClass = this.node
			.getChildByPath('front/class')
			.getComponent(Sprite);

		this.node.on('data', (cardId: string) => {
			if (this.cardId === cardId) return;

			this.unsubscribe?.();
			this.unsubscribe = system.duel.subscribe(
				`state#${cardId}`,
				this.onStateChange.bind(this),
			);

			this.cardId = cardId;
			this.renderAll();
		});
	}

	onDestroy(): void {
		this.unsubscribe?.();
	}

	onStateChange(current: CardState): void {
		console.log(this.node.uuid, current, '<--');
	}

	renderAll(): void {
		const card = getCard(system.duel.cardMap, this.cardId);
		const title = card.title ? ` - ${card.title}` : '';
		this.cardName.string = `${card.name}${title}`;
		this.cardAttack.string = String(card.attribute.attack);
		this.cardDefense.string = String(card.attribute.defense);
		this.cardHealth.string = String(card.attribute.health);
		this.cardSkill.string = getSkillDesc(card.skill.template as never);

		resources.load(getVisualUri(card.id), (err, spriteFrame: SpriteFrame) => {
			if (!err) {
				this.cardVisual.spriteFrame = spriteFrame;
			}
		});

		resources.load(getFoilUri(card.id), (err, spriteFrame: SpriteFrame) => {
			if (!err) {
				this.cardFoil.spriteFrame = spriteFrame;
			}
		});

		resources.load(getClassUri(card.class), (err, spriteFrame: SpriteFrame) => {
			if (!err) {
				this.cardClass.spriteFrame = spriteFrame;
			}
		});
	}

	showPreview(): void {
		playAnimation(system.globalNodes.cardPreview, 'fade-in');
		system.globalNodes.cardPreview.setPosition(0, -168);
	}

	hidePreview(): void {
		system.globalNodes.cardPreview.setPosition(190, 740);
	}

	onMouseEnter(): void {
		setCursor('grab');
		if (system.dragging) return;

		this.uiOpacity.opacity = 50;
		system.previewing = true;
		system.activeCard = this.node;
		system.globalNodes.cardPreview.setPosition(this.node.position.x, -168);

		playAnimation(system.globalNodes.cardPreview, 'fade-in');
	}

	onMouseLeave(): void {
		setCursor('auto');
		this.uiOpacity.opacity = 255;
	}
}
