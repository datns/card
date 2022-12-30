import Engine, { DuelCommandBundle, DuelConfig } from '@metacraft/murg-engine';

import { synchronizeDuel } from '../replayer';
import { CardDuel } from '../util/graphql';
import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import {
	CommandPayload,
	CommandResponse,
	DuelCommands,
	JwtPayload,
} from '../util/types';

const { move, getCardState, DuelPlace } = Engine;

export const ws = new WebSocket(
	'wss://94zbw8sdk9.execute-api.ap-northeast-1.amazonaws.com/prod/',
);

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
		setTimeout(() => synchronizeDuel(), 200); /* <-- delay, for rendering */
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

export const sendBundles = (bundles: DuelCommandBundle[]): void => {
	bundles.forEach((bundle) => {
		system.history.push(bundle);
	});

	synchronizeDuel();
};

export const sendCardSummon = (cardId: string, index: number): void => {
	const state = getCardState(system.duel.stateMap, cardId);
	const { commandBundles } = move.summonCard(system.duel, {
		from: {
			owner: state.owner,
			id: state.id,
			place: DuelPlace.Hand,
		},
		to: {
			owner: state.owner,
			index,
			place: DuelPlace.Ground,
		},
	});

	sendBundles(commandBundles);
};
