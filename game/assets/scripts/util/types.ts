import { CardDuel } from './graphql';

export enum DuelCommands {
	GetState = 'GetState',
}

export interface JwtPayload {
	userId: string;
	duelId: string;
}

export interface CommandPayload {
	jwt: string;
	client: string;
	context: JwtPayload;
	send: (payload: Record<string, any>) => Promise<void>;
	command: DuelCommands;
	payload: never;
}

export interface CommandResponse {
	command: DuelCommands;
	payload: any;
}

export interface GameState {
	jwt?: string;
	context?: JwtPayload;
	duel?: CardDuel;
}
