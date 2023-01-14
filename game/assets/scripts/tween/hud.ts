import { Label, tween, UIOpacity, Vec3 } from 'cc';
import { playSoundOnce } from 'db://assets/scripts/util/sound';

import { system } from '../util/system';

export const animateRibbonAppear = async (message: string): Promise<void> => {
	const node = system.globalNodes.ribbonMessage;
	const uiOpacity = node.getComponent(UIOpacity);

	system.globalNodes.ribbonMessage
		.getChildByPath('message')
		.getComponent(Label).string = message;

	return new Promise((resolve) => {
		tween(node)
			.set({
				scale: new Vec3(0, 0, 1),
				position: new Vec3(0, 25, 0),
			})
			.call(() => playSoundOnce('your-turn4', 0.5))
			.to(0.5, { scale: new Vec3(1, 1, 1) }, { easing: 'backOut' })
			.delay(1)
			.call(() => playSoundOnce('your-turn3', 0.3))
			.call(() => {
				tween(uiOpacity)
					.to(0.25, { opacity: 0 })
					.call(() => {
						node.setPosition(new Vec3(9999, 0, 0));
						uiOpacity.opacity = 255;
						resolve();
					})
					.start();
			})
			.to(0.25, { scale: new Vec3(0, 0, 1) }, { easing: 'backIn' })
			.start();
	});
};
