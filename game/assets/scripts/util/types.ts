import { DuelCommandBundle, DuelConfig } from '@metacraft/murg-engine';

export enum DuelCommands {
	ConnectMatch = 'ConnectMatch',
	SendBundle = 'SendBundle',
}

export interface JwtPayload {
	userId: string;
	duelId: string;
}

export interface CommandPayload {
	jwt: string;
	client: string;
	command: DuelCommands;
	context?: JwtPayload;
	send?: (payload: Record<string, never>) => Promise<void>;
	payload?: never;
}

export interface CommandResponse {
	command: DuelCommands;
	payload: never;
}

export interface ServerState {
	jwt?: string;
	context?: JwtPayload;
	config?: DuelConfig;
	history?: DuelCommandBundle[];
}

export interface PlayerIds {
	me: string;
	enemy: string;
}
