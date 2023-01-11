import { Node, tween, Vec3 } from 'cc';

export const animatePreviewZoom = async (
	node: Node,
	targetNode: Node,
): Promise<void> => {
	const at = targetNode.getPosition();
	const xOffset = at.x >= 0 ? -170 : 170;
	const yOffset = at.y > 0 ? -38 : 38;

	return new Promise((resolve) => {
		node.setPosition(at.x + xOffset, at.y + yOffset);
		tween(node.getChildByPath('Card'))
			.set({ position: new Vec3(0, -8, 0), scale: new Vec3(0.5, 0.5, 1) })
			.to(
				0.1,
				{ position: new Vec3(0, 0, 0), scale: new Vec3(0.6, 0.6, 1) },
				{ easing: 'cubicInOut' },
			)
			.call(() => resolve())
			.start();
	});
};

export const animatePreviewRaise = async (
	node: Node,
	from = -8,
	duration = 0.1,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getChildByPath('Card'))
			.set({ position: new Vec3(0, from, 0) })
			.to(duration, { position: new Vec3(0, 0, 0) }, { easing: 'cubicInOut' })
			.call(() => resolve())
			.start();
	});
};

export const animateRaiseCard = async (
	node: Node,
	to = 100,
	duration = 0.1,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getChildByPath('front'))
			.to(duration, { position: new Vec3(0, to, 0) }, { easing: 'cubicInOut' })
			.call(() => resolve())
			.start();
	});
};
