import { _decorator, Component, Node, UIOpacity } from 'cc';

import { playAnimation } from './util/animation';
import { system } from './util/system';

const { ccclass } = _decorator;
const NodeEvents = Node.EventType;

interface Props {
	animation?: Animation;
	uiOpacity?: UIOpacity;
	cardFront?: Node;
	cardPreview?: Node;
}

@ccclass('CardManager')
export class CardManager extends Component {
	dragging = false;
	props: Props = {};

	start(): void {
		const cardFront = this.node.getChildByPath('front');
		this.props = {
			animation: this.node.getComponent('cc.Animation') as unknown as Animation,
			uiOpacity: this.node.getComponent('cc.UIOpacity') as UIOpacity,
			cardFront,
			cardPreview: this.node.parent.parent.getChildByPath('Card Preview'),
		};

		cardFront.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
	}

	showPreview(): void {
		const { cardPreview } = this.props;
		playAnimation(cardPreview, 'fade-in');
		cardPreview.setPosition(0, -168);
	}

	hidePreview(): void {
		const { cardPreview } = this.props;
		cardPreview.setPosition(190, 740);
	}

	onMouseEnter(): void {
		if (system.dragging) return;
		const { cardPreview, uiOpacity } = this.props;

		uiOpacity.opacity = 50;
		system.previewing = true;
		system.activeCard = this.node;
		cardPreview.setPosition(this.node.position.x, -168);
		playAnimation(cardPreview, 'fade-in');
	}
}
