import { _decorator, Component, EventMouse, Node } from 'cc';

import { system } from './util/system';

const { ccclass, property } = _decorator;
const NodeEvents = Node.EventType;

@ccclass('DuelManager')
export class DuelManager extends Component {
	@property(Node)
	ground: Node;

	start(): void {
		system.cardPreview = this.node.getChildByPath('Card Preview');

		this.node.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		this.node.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onMouseUp(): void {
		system.dragging = false;
		system.activeCard = null;
	}

	onMouseMove(e: EventMouse): void {
		if (system.dragging && system.activeCard) {
			const { x, y } = e.getUILocation();
			system.activeCard.setWorldPosition(x, y, 0);
		}
	}
}
