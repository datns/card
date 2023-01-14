import { Node, Quat, tween, Vec3 } from 'cc';

import { playSoundOnce } from '../util/sound';

import { shakeGround } from './common';

export const animatePlayerSummon = (
	cardNode: Node,
	unitNode: Node,
	to: Vec3,
): Promise<void> => {
	return new Promise((resolve) => {
		const from = cardNode.getPosition();
		const xOffset = from.x > to.x ? 10 : -10;
		const aboveTo = new Vec3(to.x + xOffset, to.y + 200, to.z);

		tween(cardNode)
			.to(0.1, { scale: new Vec3(0.52, 0.52, 1) }, { easing: 'backOut' })
			.call(() => playSoundOnce('light-fire', 0.5))
			.to(
				0.4,
				{ scale: new Vec3(0.23, 0.23, 1), position: aboveTo },
				{ easing: 'expoOut' },
			)
			.call(() => {
				cardNode.destroy();

				tween(unitNode)
					.set({ position: aboveTo, scale: new Vec3(0.25, 0.25, 1) })
					.to(
						0.3,
						{ position: to, scale: new Vec3(0.24, 0.24, 1) },
						{ easing: 'expoOut' },
					)
					.call(() => {
						playSoundOnce('ground-hit');
						shakeGround();
						resolve();
					})
					.start();
			})
			.start();
	});
};

export const animateEnemySummon = (
	cardNode: Node,
	unitNode: Node,
	to: Vec3,
): Promise<void> => {
	return new Promise((resolve) => {
		const from = cardNode.getPosition();
		const aboveTo = new Vec3(to.x, to.y + 200, to.z);
		const r1 = Quat.fromEuler(new Quat(), 180, 0, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);

		tween(unitNode)
			.set({ position: from, rotation: r1 })
			.to(0.1, { scale: new Vec3(0.5, 0.5, 1) }, { easing: 'backOut' })
			.call(() => playSoundOnce('light-fire', 0.5))
			.to(
				0.4,
				{ position: aboveTo, scale: new Vec3(0.23, 0.23, 1), rotation: r2 },
				{ easing: 'expoOut' },
			)
			.to(0.3, { position: to }, { easing: 'expoOut' })
			.call(() => {
				playSoundOnce('ground-hit');
				shakeGround();
				resolve();
			})
			.start();
	});
};

export const animateGroundAppear = (node: Node, from: Vec3): Promise<void> => {
	return new Promise((resolve) => {
		tween(node)
			.set({ scale: new Vec3(0.25, 0.25, 1), position: from })
			.to(0.5, { scale: new Vec3(0.24, 0.24, 1) })
			.call(() => resolve())
			.start();
	});
};

export const animateGroundReveal = (node: Node): Promise<void> => {
	return new Promise((resolve) => {
		const r1 = Quat.fromEuler(new Quat(), 0, 180, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 90, 0);
		const r3 = Quat.fromEuler(new Quat(), 0, 0, 0);

		tween(node)
			.set({ rotation: r1 })
			.to(0.25, { rotation: r2, scale: new Vec3(0.26, 0.26, 1) })
			.call(() => (node.getChildByPath('back').active = false))
			.to(0.25, { rotation: r3, scale: new Vec3(0.24, 0.24, 1) })
			.call(resolve)
			.start();
	});
};
