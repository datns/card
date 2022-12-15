import { _decorator, Component, Node, tween, Vec3 } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('CardManager')
export class CardManager extends Component {
	start(): void {
		tween(this.node)
			.to(3, { position: new Vec3(10, 10, 10) }, { easing: 'bounceInOut' })
			.to(3, { position: new Vec3(0, 0, 0) }, { easing: 'elasticOut' })
			.union()
			.repeat(999)
			.start();
	}
}
