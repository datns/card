import Engine, { DuelCommandBundle, DuelConfig } from '@metacraft/murg-engine';

import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import {
	CommandPayload,
	CommandResponse,
	DuelCommands,
	ServerState,
} from '../util/types';
export const ws = new WebSocket('ws://localhost:3006');

export const send = (payload: CommandPayload): void => {
	ws.send(JSON.stringify(payload));
};

const { getInitialState } = Engine;

ws.onmessage = (item) => {
	const { command, payload }: CommandResponse = JSON.parse(item.data);

	if (command === DuelCommands.GetState) {
		const { duel, context } = payload as ServerState;

		system.serverState = payload as ServerState;
		system.duel = getInitialState(duel.config as DuelConfig);
		system.history = duel.history as DuelCommandBundle[];
		system.board?.emit('stateReady');
		system.playerIds = extractPlayerIds(
			context.userId,
			duel.config as DuelConfig,
		);
	}
};

ws.onerror = (error) => {
	console.log(error);
};

ws.onopen = () => {
	const searchParams = new URLSearchParams(location.search);
	const jwt = searchParams.get('jwt');

	ws.send(
		JSON.stringify({
			jwt,
			client: 'cardGame',
			command: DuelCommands.GetState,
		}),
	);
};
