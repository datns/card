import { _decorator, Animation, Component, Node, UIOpacity } from 'cc';

import { playAnimation } from './util/animation';
import { setCursor, system } from './util/system';

const { ccclass } = _decorator;
const NodeEvents = Node.EventType;

@ccclass('CardManager')
export class CardManager extends Component {
	ready = false;
	animation: Animation;
	uiOpacity: UIOpacity;
	cardFront: Node;

	start(): void {
		this.cardFront = this.node.getChildByPath('front');
		this.animation = this.node.getComponent(Animation);
		this.uiOpacity = this.node.getComponent(UIOpacity);

		this.node.on('ready', this.onReady.bind(this));
		this.cardFront.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.cardFront.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
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
		if (!this.ready || system.dragging) return;

		this.uiOpacity.opacity = 50;
		system.previewing = true;
		system.activeCard = this.node;
		system.globalNodes.cardPreview.setPosition(this.node.position.x, -168);
		playAnimation(system.globalNodes.cardPreview, 'fade-in');
	}

	onMouseLeave(): void {
		setCursor('auto');
	}

	onReady(): void {
		this.ready = true;
	}
}
