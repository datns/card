import { Node, tween, Vec3 } from 'cc';

export const animateCardAttack = async (
	node: Node,
	isPlayerAttack: boolean,
): Promise<void> => {
	const from = node.getPosition();
	const isMovingUp = from.y < 0;
	const fastSeed = 20;
	const fastDelta = isMovingUp ? -fastSeed : fastSeed;
	const slowSeed = 5;
	const slowDelta = isMovingUp ? -slowSeed : slowSeed;
	const destSeed = isPlayerAttack ? 10 : 56;
	const destDelta = isMovingUp ? -destSeed : destSeed;

	return new Promise((resolve) => {
		tween(node)
			.to(
				0.5,
				{ position: new Vec3(from.x, from.y + fastDelta, 0) },
				{ easing: 'elasticInOut' },
			)
			.by(0.5, { position: new Vec3(0, slowDelta, 0) })
			.to(
				0.2,
				{ position: new Vec3(from.x, destDelta, 0) },
				{ easing: 'expoInOut' },
			)
			.to(1, { position: from }, { easing: 'expoInOut' })
			.call(resolve)
			.start();
	});
};
