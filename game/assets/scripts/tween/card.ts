import { Node, Quat, Tween, tween, Vec3 } from 'cc';

import { CardManager } from '../CardManager';

export const expoCard = (node: Node, speed = 1): Tween<Node> => {
	let flipped = false;
	const r1 = Quat.fromEuler(new Quat(), 90, 90, 91);
	const r2 = Quat.fromEuler(new Quat(), 12, 0, 0);
	const r3 = Quat.fromEuler(new Quat(), 0, 0, 0);
	const translate = tween(node)
		.set({ position: new Vec3(425, -232, 0) })
		.to(0.5 / speed, { position: new Vec3(440, -15, 0) }, { easing: 'cubicIn' })
		.by(1.5 / speed, { position: new Vec3(0, 15, 0) }, { easing: 'quadOut' });

	const rotate = tween(node)
		.set({ rotation: r1, active: true })
		.to(
			0.5 / speed,
			{ rotation: r2 },
			{
				easing: 'cubicIn',
				onUpdate: (node: Node) => {
					if (flipped) return;
					const angle = new Vec3(0, 0, 0);
					node.rotation.getEulerAngles(angle);
					if (angle.z < 30) {
						node.getChildByPath('back').active = false;
						flipped = true;
					}
				},
			},
		)
		.to(1.5 / speed, { rotation: r3 }, { easing: 'quadIn' });

	const scale = tween(node)
		.set({ scale: new Vec3(0.22, 0.22, 1) })
		.to(0.5 / speed, { scale: new Vec3(0.48, 0.48, 1) }, { easing: 'quadIn' })
		.to(1.5 / speed, { scale: new Vec3(0.5, 0.5, 1) }, { easing: 'quadOut' });

	return tween(node).parallel(translate, rotate, scale);
};

export const revealPlayerCard = (node: Node): void => {
	const manager = node.getComponent(CardManager);
	const markAsReady = () => {
		manager.props.ready = true;
	};

	manager.props.ready = false;
	expoCard(node)
		.to(1, { position: new Vec3(0, -360, 0) }, { easing: 'expoOut' })
		.call(markAsReady)
		.start();
};
