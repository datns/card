import { Node, tween, Vec3 } from 'cc';

export const animateCardAttack = async (
	node: Node,
	isPlayerAttack: boolean,
): Promise<void> => {
	const from = node.getPosition();
	const isMovingUp = from.y < 0;
	const fastSeed = 12;
	const fastDelta = isMovingUp ? -fastSeed : fastSeed;
	const destSeed = isPlayerAttack ? 46 : 62;
	const destDelta = isMovingUp ? -destSeed : destSeed;

	return new Promise((resolve) => {
		tween(node)
			.to(
				0.5,
				{ position: new Vec3(from.x, from.y + fastDelta, 0) },
				{ easing: 'elasticInOut' },
			)
			.to(
				0.2,
				{ position: new Vec3(from.x, destDelta, 0) },
				{ easing: 'expoInOut' },
			)
			.to(0.5, { position: from }, { easing: 'expoInOut' })
			.call(resolve)
			.start();
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
