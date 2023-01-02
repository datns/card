import { DuelCommands } from '../util/types';

import { connectMatch } from './handlers';
import { ws } from './instance';

ws.onmessage = (item) => {
	const { isMyCommand, command, payload } = JSON.parse(item.data);

	if (command === DuelCommands.ConnectMatch) {
		connectMatch(payload, isMyCommand);
	}
};

ws.onerror = (error) => {
	console.log(error);
};

ws.onopen = () => {
	console.log('socket connected!');
};

export * from './sender';
