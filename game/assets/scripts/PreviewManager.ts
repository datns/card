import { _decorator, Component, EventMouse, Node, UIOpacity, Vec2 } from 'cc';

import { setCursor, system } from './util/system';

const { ccclass } = _decorator;
const NodeEvents = Node.EventType;

interface Props {
	card?: Node;
	dragging?: boolean;
	dragOffset?: Vec2;
}

@ccclass('PreviewManager')
export class PreviewManager extends Component {
	props: Props = {};

	start(): void {
		this.props.card = this.node.getChildByPath('Card');
		this.node.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.node.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		this.node.on(NodeEvents.MOUSE_DOWN, this.onMouseDown.bind(this));
		this.node.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		this.node.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onMouseEnter(): void {
		this.props.dragging = false;
		setCursor('grab');
	}

	onMouseLeave(): void {
		setCursor('auto');
		this.hidePreview();
	}

	onMouseDown(e: EventMouse): void {
		this.props.dragging = true;
		this.props.dragOffset = e.getLocation();
	}

	onMouseUp(): void {
		this.props.dragging = false;
	}

	onMouseMove(e: EventMouse): void {
		if (!this.props.dragging) return;

		const location = e.getLocation();
		const distance = Vec2.distance(location, this.props.dragOffset);

		if (distance > 5) {
			this.hidePreview();
			system.dragging = true;
		}
	}

	hidePreview(): void {
		this.node.setPosition(190, 740);

		if (system.activeCard) {
			const uiOpacity = system.activeCard.getComponent(
				'cc.UIOpacity',
			) as UIOpacity;
			uiOpacity.opacity = 255;
		}
	}
}
