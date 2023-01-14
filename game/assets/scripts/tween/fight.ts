import { Node, Quat, tween, Vec3 } from 'cc';

import { playSoundOnce } from '../util/sound';
import { system } from '../util/system';

import { shakeGround } from './common';

export const animateCardAttack = async (
	node: Node,
	isDeath: boolean,
	index: number,
): Promise<void> => {
	const from = node.getPosition();
	const backFace = node.getChildByPath('back');
	const isMovingUp = from.y < 0;
	const fastSeed = 12;
	const fastDelta = isMovingUp ? -fastSeed : fastSeed;

	return new Promise((resolve) => {
		let flipped = false;
		const r1 = Quat.fromEuler(new Quat(), 0, 180, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 0, 0);

		const translate = tween(node)
			.to(
				1,
				{ position: new Vec3(from.x, from.y + fastDelta, 0) },
				{ easing: 'backOut' },
			)
			.call(() => {
				if (backFace?.active) backFace.active = false;
			})
			.to(0.2, { position: new Vec3(from.x, 0, 0) }, { easing: 'expoOut' })
			.call(() => {
				if (index === 0) {
					playSoundOnce('ground-hit', 1);
					shakeGround(10, 5);
				}
			});

		const rotate = backFace?.active
			? tween(node)
					.set({ rotation: r1 })
					.to(
						1,
						{ rotation: r2 },
						{
							easing: 'expoOut',
							onUpdate: (node: Node) => {
								if (flipped) return;
								const angle = new Vec3(0, 0, 0);
								node.rotation.getEulerAngles(angle);

								if (angle.y < 90) {
									node.getChildByPath('back').active = false;
									flipped = true;
								}
							},
						},
					)
			: tween(node).delay(1);

		if (isDeath) {
			node.parent = system.globalNodes.playerHand;
			const randomOffset = Math.random() * 1280 - 640;

			translate
				.to(
					0.5,
					{
						position: new Vec3(randomOffset, -400, 0),
						scale: new Vec3(1, 1, 1),
					},
					{ easing: 'expoIn' },
				)
				.call(() => node.destroy());
		} else {
			translate.to(0.5, { position: from }, { easing: 'backOut' });
		}

		tween(node).parallel(translate, rotate).call(resolve).start();
	});
};

export const animateCardDeath = async (node: Node): Promise<void> => {
	return new Promise((resolve) => {
		tween(node)
			.to(0.5, { scale: new Vec3(0, 0, 1) }, { easing: 'elasticInOut' })
			.call(() => {
				resolve();
				node.destroy();
			})
			.start();
	});
};
