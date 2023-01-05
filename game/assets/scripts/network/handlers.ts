import Engine, { DuelCommandBundle, DuelConfig } from '@metacraft/murg-engine';

import { synchronizeDuel } from '../replayer';
import { CardDuel } from '../util/graphql';
import { extractPlayerIds } from '../util/helper';
import { system } from '../util/system';
import { JwtPayload } from '../util/types';

const { getInitialState, mergeFragmentToState } = Engine;
interface ConnectMatchPayload {
	jwt: string;
	context: JwtPayload;
	duel: CardDuel;
}

export const handleConnect = (
	{ jwt, context, duel }: ConnectMatchPayload,
	isMyCommand?: boolean,
): void => {
	if (!isMyCommand) return;
	const state = getInitialState(duel.config as DuelConfig);

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
	mergeFragmentToState(system.duel, state);
	system.globalNodes.board?.emit('stateReady');

	setTimeout(() => synchronizeDuel(), 200);
};

export const handleBundles = (bundles: DuelCommandBundle[]): void => {
	bundles.forEach((bundle) => {
		system.history.push(bundle);
	});

	synchronizeDuel();
};
