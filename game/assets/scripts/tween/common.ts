import { Color, Label, Node, tween, UIOpacity } from 'cc';

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

export const animateSwapLabel = async (
	node: Node,
	toLabel: string,
	toColor: Color,
	duration = 1,
): Promise<void> => {
	return new Promise((resolve) => {
		tween(node.getComponent(UIOpacity))
			.to(
				duration / 2,
				{ opacity: 0 },
				{
					easing: 'fade',
					onComplete: () => {
						const label = node.getComponent(Label);
						label.string = toLabel;
						label.color = toColor; //Color.fromVec4(new Vec4(0, 0, 0, 1));
					},
				},
			)
			.to(duration / 2, { opacity: 255 }, { easing: 'expoInOut' })
			.call(() => resolve())
			.start();
	});
};
