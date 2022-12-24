import { Node, Quat, Tween, tween, Vec3 } from 'cc';

const defaultExpoDest = new Vec3(440, -15, 0);
export const expoCard = (
	node: Node,
	delay = 0,
	dest: Vec3 = defaultExpoDest,
	speed = 1,
): Tween<Node> => {
	let flipped = false;
	const r1 = Quat.fromEuler(new Quat(), 90, 90, 91);
	const r2 = Quat.fromEuler(new Quat(), 12, 0, 0);
	const r3 = Quat.fromEuler(new Quat(), 0, 0, 0);
	const translate = tween(node)
		.set({ position: new Vec3(425, -232, 0) })
		.to(0.5 / speed, { position: dest }, { easing: 'cubicIn' })
		.by(1 / speed, { position: new Vec3(0, 15, 0) }, { easing: 'quadOut' });

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
		.to(1 / speed, { scale: new Vec3(0.5, 0.5, 1) }, { easing: 'quadOut' });

	return tween(node).delay(delay).parallel(translate, rotate, scale);
};

const defaultRevealDest = new Vec3(0, -360, 0);

export const revealPlayerCard = (
	node: Node,
	delay = 0,
	expoDest: Vec3 = defaultExpoDest,
	dest: Vec3 = defaultRevealDest,
	speed = 1,
): void => {
	expoCard(node, delay, expoDest, speed)
		.to(
			1,
			{ position: dest, scale: new Vec3(0.4, 0.4, 1) },
			{ easing: 'expoOut' },
		)
		.call(() => node.emit('ready'))
		.start();
};
