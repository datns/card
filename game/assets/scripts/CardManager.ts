import {
	_decorator,
	Animation,
	Component,
	Node,
	tween,
	UIOpacity,
	Vec3,
} from 'cc';

import { playAnimation } from './util/animation';

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
	props: Props = {};

	start(): void {
		this.props = {
			animation: this.node.getComponent('cc.Animation') as Animation,
			uiOpacity: this.node.getComponent('cc.UIOpacity') as UIOpacity,
			cardFront: this.node.getChildByPath('front'),
			cardPreview: this.node.parent.parent.getChildByPath('Card Preview'),
		};

		this.bindMouseEvents();
	}

	bindMouseEvents(): void {
		const { cardFront } = this.props;
		cardFront.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		cardFront.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
	}

	onMouseEnter(): void {
		const { cardPreview } = this.props;

		cardPreview.setPosition(0, -58);
		tween(this.node)
			.by(0.2, { position: new Vec3(0, 20, 0) }, { easing: 'cubicInOut' })
			.start();
		playAnimation(cardPreview, 'fade-in');
	}

	onMouseLeave(): void {
		const { cardPreview } = this.props;

		cardPreview.setPosition(190, 740);
		tween(this.node)
			.by(0.2, { position: new Vec3(0, -20, 0) }, { easing: 'cubicInOut' })
			.start();
	}
}
