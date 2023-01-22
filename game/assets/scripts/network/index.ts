import { system } from '../util/system';
import { DuelCommands } from '../util/types';

import * as handlers from './handlers';
import { connectionInstance } from './util';

connectionInstance.onmessage = (item) => {
	const { isMyCommand, command, payload } = JSON.parse(item.data);

	if (command === DuelCommands.ConnectMatch) {
		handlers.connect(payload, isMyCommand);
	} else if (command === DuelCommands.SendBundle) {
		handlers.incomingBundles(payload);
	} else if (command === DuelCommands.GameOver) {
		handlers.gameOver(payload);
	}
};

connectionInstance.onerror = (error) => {
	console.log(error);
};

connectionInstance.onopen = () => {
	system.isSocketReady = true;
};

export const waitForSocket = (maxRetry = 100): Promise<boolean> => {
	let retryCount = 0;

	return new Promise((resolve, reject) => {
		const waitInterval = setInterval(() => {
			if (system.isSocketReady) {
				resolve(true);
				clearInterval(waitInterval);
			} else if (retryCount > maxRetry) {
				reject('too many retries');
				clearInterval(waitInterval);
			}

			retryCount += 1;
		}, 500);
	});
};

export * from './sender';
