import Engine, { DuelCommandBundle, DuelConfig } from '@metacraft/murg-engine';

import { replay } from '../replay';
import { showEndGameRibbon } from '../tween';
import { CardDuel } from '../util/graphql';
import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import { JwtPayload } from '../util/types';

import { mergeRemoteHistory } from './util';

const { getInitialState, mergeFragmentToState } = Engine;
interface ConnectPayload {
	jwt: string;
	context: JwtPayload;
	duel: CardDuel;
}

export const connect = (
	{ jwt, context, duel }: ConnectPayload,
	isMyCommand?: boolean,
): void => {
	if (!isMyCommand) return;
	const state = getInitialState(duel.config as DuelConfig);
	const config = duel.config as DuelConfig;
	const history = duel.history as DuelCommandBundle[];

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
	mergeRemoteHistory(bundles, level);
	replay();
};

interface GameOver {
	winner: string;
}

export const gameOver = ({ winner }: GameOver): void => {
	const isVictory = system.playerIds.me === winner;
	const ribbonMessage = isVictory ? 'Victory!' : 'Defeat!';

	system.winner = winner;
	showEndGameRibbon(ribbonMessage);
};
