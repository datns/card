import {
	_decorator,
	Component,
	EventMouse,
	Node,
	tween,
	UIOpacity,
	Vec3,
} from 'cc';

import { playAnimation } from './util/animation';
import { extractMouseLocation, setCursor, system } from './util/system';

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
		this.props = {
			animation: this.node.getComponent('cc.Animation') as unknown as Animation,
			uiOpacity: this.node.getComponent('cc.UIOpacity') as UIOpacity,
			cardFront: this.node.getChildByPath('front'),
			cardPreview: this.node.parent.parent.getChildByPath('Card Preview'),
		};

		this.bindMouseEvents();
	}

	showPreview(): void {
		const { cardPreview } = this.props;
		playAnimation(cardPreview, 'fade-in');
		cardPreview.setPosition(0, -58);
	}

	hidePreview(): void {
		const { cardPreview } = this.props;
		cardPreview.setPosition(190, 740);
	}

	bindMouseEvents(): void {
		const { cardFront } = this.props;
		cardFront.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		cardFront.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		cardFront.on(NodeEvents.MOUSE_DOWN, this.onMouseDown.bind(this));
		cardFront.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		// cardFront.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onMouseEnter(): void {
		setCursor('grab');
		if (system.dragging) return;

		this.dragging = false;
		this.showPreview();
		tween(this.node)
			.by(0.2, { position: new Vec3(0, 20, 0) }, { easing: 'cubicInOut' })
			.start();
	}

	onMouseLeave(e: EventMouse): void {
		setCursor('auto');
		if (system.dragging) return;

		if (this.dragging) {
			const mouseLocation = e.getLocation();
			system.dragging = true;
			system.activeCard = this.node;
			tween(this.node)
				.to(
					0.1,
					{
						position: extractMouseLocation(mouseLocation),
						scale: new Vec3(0.5, 0.5, 0.5),
					},
					{ easing: 'cubicIn' },
				)
				.start();
		} else {
			this.hidePreview();
			tween(this.node)
				.by(0.2, { position: new Vec3(0, -20, 0) }, { easing: 'cubicInOut' })
				.to(0.1, { scale: new Vec3(0.4, 0.4, 1) })
				.start();
		}
	}

	onMouseDown(): void {
		this.dragging = true;
		this.hidePreview();
	}

	onMouseUp(): void {
		this.dragging = false;
	}

	onMouseMove(e: EventMouse): void {
		if (!system.dragging) return;
		const mouseLocation = e.getLocation();
		const nodeLocation = extractMouseLocation(mouseLocation);
		// this.node.setPosition(nodeLocation);
	}
}
