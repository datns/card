import { _decorator, Component, EventMouse, Node } from 'cc';

import { extractMouseLocation, system } from './util/system';
import { BoardManager } from './BoardManager';

const { ccclass, property } = _decorator;
const NodeEvents = Node.EventType;

interface Props {
	boardManager?: BoardManager;
}

@ccclass('DuelManager')
export class DuelManager extends Component {
	props: Props = {};

	@property(Node)
	ground: Node;

	start(): void {
		const board = this.node.getChildByPath('Safe Zone/Board') as Node;

		this.props = {
			boardManager: board.getComponent('BoardManager') as BoardManager,
		};

		this.node.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		this.node.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onMouseUp(): void {
		system.dragging = false;
		system.activeCard = null;
	}

	onMouseMove(e: EventMouse): void {
		if (system.dragging && system.activeCard) {
			const mouseLocation = e.getLocation();
			system.activeCard.setPosition(extractMouseLocation(mouseLocation));
		}
	}
}
