import { _decorator, Animation, Component, Node } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('DuelManager')
export class DuelManager extends Component {
	@property(Node)
	ground: Node;

	groundAni: Animation;

	start(): void {
		this.groundAni = this.ground.getComponent('cc.Animation') as Animation;
		this.groundAni.play('ground-reveal');
	}
}
