import { DuelCommands } from '../util/types';

import { handleBundles, handleConnect } from './handlers';
import { ws } from './instance';

ws.onmessage = (item) => {
	const { isMyCommand, command, payload } = JSON.parse(item.data);

	if (command === DuelCommands.ConnectMatch) {
		handleConnect(payload, isMyCommand);
	} else if (command === DuelCommands.SendBundle) {
		if (!isMyCommand) handleBundles(payload);
	}
};

ws.onerror = (error) => {
	console.log(error);
};

ws.onopen = () => {
	console.log('socket connected!');
};

export * from './sender';
