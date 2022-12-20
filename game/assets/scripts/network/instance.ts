import {
	CommandPayload,
	CommandResponse,
	DuelCommands,
	GameState,
} from '../util/types';
export const ws = new WebSocket('ws://localhost:3006');

export const state: GameState = {};

export const send = (payload: CommandPayload): void => {
	ws.send(JSON.stringify(payload));
};

ws.onmessage = (item) => {
	const payload: CommandResponse = JSON.parse(item.data);

	if (payload.command === DuelCommands.GetState) {
		state.context = payload.payload.context;
		state.duel = payload.payload.duel;
	}

	console.log(state);
};

ws.onerror = (error) => {
	console.log(error);
};

ws.onopen = () => {
	const searchParams = new URLSearchParams(location.search);
	state.jwt = searchParams.get('jwt');

	ws.send(
		JSON.stringify({
			client: 'cardGame',
			jwt: state.jwt,
			command: DuelCommands.GetState,
		}),
	);
};
