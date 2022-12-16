import { _decorator, Component, Node } from 'cc';

const { ccclass } = _decorator;

@ccclass('CardManager')
export class CardManager extends Component {
	start(): void {
		const boardNode = this.node.getChildByPath('Safe Zone') as Node;
		console.log(boardNode);
	}
}
