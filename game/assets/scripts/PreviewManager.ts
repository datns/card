import { _decorator, Component, Node } from 'cc';

import { CardManager } from './CardManager';

const { ccclass } = _decorator;
const NodeEvents = Node.EventType;

@ccclass('PreviewManager')
export class PreviewManager extends Component {
	public cardManager: CardManager;
	isDragging = false;

	start(): void {
		this.node.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		this.node.on(NodeEvents.MOUSE_DOWN, this.onMouseDown.bind(this));
		this.node.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
	}

	onMouseLeave(): void {
		this.node.setPosition(190, 740);

		if (this.cardManager) {
			this.cardManager.onMouseLeave();
		}
	}

	onMouseDown(): void {
		this.isDragging = true;
		console.log('mouse down!');
	}

	onMouseUp(): void {
		this.isDragging = false;
		console.log('mouse up!');
	}
}
