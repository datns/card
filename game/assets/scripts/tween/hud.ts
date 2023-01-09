import { Label, tween, Vec3 } from 'cc';

import { system } from '../util/system';

export const animateRibbonAppear = async (message: string): Promise<void> => {
	system.globalNodes.ribbonMessage
		.getChildByPath('message')
		.getComponent(Label).string = message;

	return new Promise((resolve) => {
		tween(system.globalNodes.ribbonMessage)
			.set({
				scale: new Vec3(0, 0, 1),
				position: new Vec3(0, 25, 0),
			})
			.to(1, { scale: new Vec3(1, 1, 1) }, { easing: 'circInOut' })
			.delay(2)
			.to(0.5, { scale: new Vec3(0, 0, 1) }, { easing: 'expoInOut' })
			.set({ position: new Vec3(-1000, 0, 0) })
			.call(() => resolve())
			.start();
	});
};
