import Engine, { DuelCommandBundle, DuelConfig } from '@metacraft/murg-engine';

import { synchronizeDuel } from '../replayer';
import { CardDuel } from '../util/graphql';
import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import { JwtPayload } from '../util/types';

const { getInitialState } = Engine;
interface ConnectMatchPayload {
	jwt: string;
	isMine?: boolean;
	context: JwtPayload;
	duel: CardDuel;
}

export const connectMatch = (
	{ jwt, context, duel }: ConnectMatchPayload,
	isMine?: boolean,
): void => {
	if (!isMine) return;

	system.serverState = {
		jwt,
		context,
		config: duel.config as DuelConfig,
		history: duel.history as DuelCommandBundle[],
	};
	system.playerIds = extractPlayerIds(
		duel.config as DuelConfig,
		context.userId,
	);
	system.duel = getInitialState(duel.config as DuelConfig);
	system.globalNodes.board?.emit('stateReady');

	setTimeout(() => synchronizeDuel(), 200);
};
