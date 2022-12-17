import { _decorator, Component, Node } from 'cc';
import { BoardManager } from 'db://assets/scripts/BoardManager';

const { ccclass, property } = _decorator;

interface Props {
	boardManager?: BoardManager;
}

@ccclass('DuelManager')
export class DuelManager extends Component {
	props: Props = {};

	@property(Node)
	ground: Node;

	start(): void {
		const boardNode = this.node.getChildByPath('Safe Zone/Board');

		this.props = {
			boardManager: boardNode.getComponent('BoardManager') as BoardManager,
		};
	}
}
