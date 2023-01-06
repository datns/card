import { Label, Node, Quat, tween, UIOpacity, Vec3 } from 'cc';

export const animateFade = async (
	node: Node,
	to: number,
	duration = 2,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getComponent(UIOpacity))
			.to(duration, { opacity: to }, { easing: 'fade' })
			.call(() => resolve())
			.start();
	});
};

export const animateLabelFlip = async (
	node: Node,
	toLabel: string,
	duration = 1,
): Promise<void> => {
	return new Promise((resolve) => {
		let flipped = false;
		const r1 = Quat.fromEuler(new Quat(), 0, 0, 0);
		const r2 = Quat.fromEuler(new Quat(), 0, 180, 0);
		const r3 = Quat.fromEuler(new Quat(), 0, 359, 0);

		tween(node)
			.set({ rotation: r1 })
			.to(
				duration / 2,
				{ rotation: r2 },
				{
					easing: 'expoInOut',
					onUpdate: () => {
						if (flipped) return;
						const angle = new Vec3(0, 0, 0);
						node.rotation.getEulerAngles(angle);

						if (angle.y > 90) {
							node.getComponent(Label).string = toLabel;
							flipped = true;
						}
					},
				},
			)
			.to(duration / 2, { rotation: r3 }, { easing: 'expoInOut' })
			.call(() => resolve())
			.start();
	});
};
