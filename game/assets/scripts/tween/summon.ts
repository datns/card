import { instantiate, Node, Quat, tween, Vec3 } from 'cc';

import { UnitManager } from '../UnitManager';
import { playSound } from '../util/sound';
import { system } from '../util/system';

import { shakeGround } from './common';

export const animatePlayerSummon = (
	cardId: string,
	node: Node,
	to: Vec3,
): Promise<void> => {
	return new Promise((resolve) => {
		const from = node.getPosition();
		const unit = instantiate(system.globalNodes.unitTemplate);
		const xOffset = from.x > to.x ? 10 : -10;
		const aboveTo = new Vec3(to.x + xOffset, to.y + 200, to.z);

		node.getChildByPath('glow').active = false;
		unit.getComponent(UnitManager).setCardId(cardId);
		unit.parent = system.globalNodes.playerGround;

		system.cardRefs[cardId] = unit;

		tween(node)
			.to(0.1, { scale: new Vec3(0.52, 0.52, 1) }, { easing: 'backOut' })
			.call(() => playSound('summon-detach'))
			.to(
				0.4,
				{ scale: new Vec3(0.23, 0.23, 1), position: aboveTo },
				{ easing: 'expoOut' },
			)
			.call(() => {
				tween(unit)
					.set({ position: aboveTo, scale: new Vec3(0.25, 0.25, 1) })
					.to(
						0.3,
						{ position: to, scale: new Vec3(0.24, 0.24, 1) },
						{ easing: 'expoOut' },
					)
					.call(() => {
						playSound('card-landing');
						shakeGround();
						resolve();
					})
					.start();

				node.destroy();
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

export const animateFromEnemyHandToGround = (
	node: Node,
	from: Vec3,
	to: Vec3,
): Promise<void> => {
	return new Promise((resolve) => {
		const r1 = Quat.fromEuler(new Quat(), 180, 0, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);
		const translate = tween(node)
			.set({ position: from })
			.to(1, { position: to }, { easing: 'expoInOut' });
		const scale = tween(node)
			.to(0.2, { scale: new Vec3(0.3, 0.3, 1) }, { easing: 'expoInOut' })
			.to(0.8, { scale: new Vec3(0.23, 0.23, 1) }, { easing: 'expoInOut' });
		const rotate = tween(node)
			.set({ rotation: r1 })
			.to(1, { rotation: r2 }, { easing: 'expoInOut' });

		tween(node).parallel(translate, rotate, scale).call(resolve).start();
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
