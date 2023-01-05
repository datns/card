import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import deepClone from 'lodash.clonedeep';

import { synchronizeDuel } from '../replayer';
import { system } from '../util/system';
import { CommandPayload, DuelCommands } from '../util/types';

import { ws } from './instance';

const { getCardState, move, DuelPlace } = Engine;

export const sendCommand = (command: DuelCommands, payload?: any): void => {
	const data: CommandPayload = {
		jwt: system.jwt,
		client: 'cardGame',
		command,
	};

	if (data) data.payload = payload;
	ws.send(JSON.stringify(data));
};

export const sendConnect = (): void => {
	const searchParams = new URLSearchParams(location.search);
	system.jwt = searchParams.get('jwt') as string;

	sendCommand(DuelCommands.ConnectMatch);
};

export const sendBundles = (bundles: DuelCommandBundle[]): void => {
	bundles.forEach((bundle) => {
		system.history.push(bundle);
	});

	sendCommand(DuelCommands.SendBundle, bundles);

	synchronizeDuel();
};

export const sendCardSummon = (cardId: string, index: number): void => {
	const state = getCardState(system.duel.stateMap, cardId);
	const { commandBundles } = move.summonCard(deepClone(system.duel), {
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
