import { _decorator, Component, EventMouse, Node } from 'cc';

import { extractMouseLocation, system } from './util/system';
import { BoardManager } from './BoardManager';

const { ccclass, property } = _decorator;
const NodeEvents = Node.EventType;

interface Props {
	boardManager?: BoardManager;
	safeZone?: Node;
}

@ccclass('DuelManager')
export class DuelManager extends Component {
	props: Props = {};

	@property(Node)
	ground: Node;

	start(): void {
		const safeZone = this.node.getChildByPath('Safe Zone') as Node;
		const board = this.node.getChildByPath('Safe Zone/Board') as Node;

		this.props = {
			safeZone,
			boardManager: board.getComponent('BoardManager') as BoardManager,
		};

		safeZone.on(NodeEvents.MOUSE_DOWN, this.onMouseDown.bind(this));
		safeZone.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		safeZone.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onMouseDown(): void {}

	onMouseUp(): void {
		system.dragging = false;
		system.activeCard = null;
	}

	onMouseMove(e: EventMouse): void {
		if (system.activeCard) {
			const mouseLocation = e.getLocation();
			system.activeCard.setPosition(extractMouseLocation(mouseLocation));
		}
	}
}
