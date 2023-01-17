import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';

import { replay } from '../replay';
import { showEndGameRibbon } from '../tween';
import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import { CardDuel, JwtPayload } from '../util/types';

import { mergeRemoteHistory } from './util';

const { getInitialState, mergeFragmentToState } = Engine;
interface ConnectPayload {
	jwt: string;
	context: JwtPayload;
	duel: CardDuel;
}

export const connect = (
	{ jwt, context, duel }: ConnectPayload,
	isMyCommand: boolean,
): void => {
	if (system.winner || !isMyCommand) return;

	const { config, history } = duel;
	const state = getInitialState(config);

	mergeFragmentToState(system.duel, state);
	system.serverState = { jwt, context, config, history: [] };
	system.playerIds = extractPlayerIds(config, context.userId);
	system.globalNodes.board?.emit('stateReady');

	mergeRemoteHistory(history, 0);
	setTimeout(() => replay(), 200);
};

export interface IncomingBundles {
	level: number;
	bundles: DuelCommandBundle[];
}

export const incomingBundles = ({ level, bundles }: IncomingBundles): void => {
	if (system.winner) return;

	mergeRemoteHistory(bundles, level);
	replay();
};

interface GameOver {
	winner: string;
}

export const gameOver = ({ winner }: GameOver): void => {
	if (system.winner) return;

	const isVictory = system.playerIds.me === winner;

	system.winner = winner;
	showEndGameRibbon(isVictory);
};
