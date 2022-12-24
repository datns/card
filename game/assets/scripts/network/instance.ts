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

ws.onmessage = (item) => {
	const { command, payload }: CommandResponse = JSON.parse(item.data);

	if (command === DuelCommands.GetState) {
		const { jwt, context, duel } = payload as {
			jwt: string;
			context: JwtPayload;
			duel: CardDuel;
		};

		system.serverState = {
			jwt,
			context,
			config: duel.config as DuelConfig,
			history: duel.history as DuelCommandBundle[],
		};
		system.duel = getInitialState(duel.config as DuelConfig);
		system.playerIds = extractPlayerIds(
			context.userId,
			duel.config as DuelConfig,
		);
		system.globalNodes.board?.emit('stateReady');
		setTimeout(() => replayDuel(), 0); /* <-- semi delay execution */
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
			command: DuelCommands.GetState,
		}),
	);
};
