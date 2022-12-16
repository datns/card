import { _decorator, Animation, Component, Node, UIOpacity } from 'cc';

import { playAnimation } from './util/animation';

const { ccclass } = _decorator;
const { EventType } = Node;

interface Props {
	animation?: Animation;
	uiOpacity?: UIOpacity;
	cardPreview?: Node;
}

@ccclass('CardManager')
export class CardManager extends Component {
	props: Props = {};
	start(): void {
		this.props = {
			animation: this.node.getComponent('cc.Animation') as Animation,
			uiOpacity: this.node.getComponent('cc.UIOpacity') as UIOpacity,
			cardPreview: this.node.parent.parent.getChildByPath('Card Preview'),
		};

		this.bindMouseEvents();
	}

	bindMouseEvents(): void {
		this.node.on(EventType.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.node.on(EventType.MOUSE_LEAVE, this.onMouseLeave.bind(this));
	}

	onMouseEnter(): void {
		const { cardPreview, uiOpacity } = this.props;

		uiOpacity.opacity = 50;
		playAnimation(cardPreview, 'fade-in');
		cardPreview.setPosition(0, -180);
	}

	onMouseLeave(): void {
		const { cardPreview, uiOpacity } = this.props;

		uiOpacity.opacity = 255;
		cardPreview.setPosition(190, 740);
	}
}
