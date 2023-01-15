import { DuelCommands } from '../util/types';

import * as handlers from './handlers';
import { connectionInstance } from './util';

connectionInstance.onmessage = (item) => {
	const { command, payload } = JSON.parse(item.data);

	if (command === DuelCommands.ConnectMatch) {
		handlers.connect(payload);
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
	console.log('socket connected!');
};

export * from './sender';
