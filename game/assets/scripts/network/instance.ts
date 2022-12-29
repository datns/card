import Engine, { DuelCommandBundle, DuelConfig } from '@metacraft/murg-engine';

import { replayDuel } from '../replayer';
import { CardDuel } from '../util/graphql';
import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import {
	CommandPayload,
	CommandResponse,
	DuelCommands,
	JwtPayload,
} from '../util/types';
export const ws = new WebSocket('ws://localhost:3006');

export const send = (payload: CommandPayload): void => {
	ws.send(JSON.stringify(payload));
};

const { getInitialState } = Engine;

interface ConnectMatchPayload {
	jwt: string;
	context: JwtPayload;
	duel: CardDuel;
}

ws.onmessage = (item) => {
	const { command, payload }: CommandResponse = JSON.parse(item.data);

	if (command === DuelCommands.ConnectMatch) {
		const { jwt, context, duel } = payload as ConnectMatchPayload;

		system.serverState = {
			jwt,
			context,
			config: duel.config as DuelConfig,
			history: duel.history as DuelCommandBundle[],
		};
		system.duel = getInitialState(duel.config as DuelConfig);
		system.playerIds = extractPlayerIds(
			duel.config as DuelConfig,
			context.userId,
		);
		system.globalNodes.board?.emit('stateReady');
		setTimeout(() => replayDuel(), 200); /* <-- delay, for rendering */
	}
};

ws.onerror = (error) => {
	console.log(error);
};

ws.onopen = () => {
	console.log('socket connected!');
};

export const sendDuelConnect = (): void => {
	const searchParams = new URLSearchParams(location.search);
	const jwt = searchParams.get('jwt');

	ws.send(
		JSON.stringify({
			jwt,
			client: 'cardGame',
			command: DuelCommands.ConnectMatch,
		}),
	);
};
