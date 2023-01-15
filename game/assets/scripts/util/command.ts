import Engine, { DuelCommand } from '@metacraft/murg-engine';

const { DuelCommandType, DuelPlace } = Engine;

export enum GroundMoves {
	No,
	Removal,
	Relocate,
}

export const extractGroundMove = (command: DuelCommand): GroundMoves => {
	const isCardMove = command.type === DuelCommandType.CardMove;
	if (!isCardMove) return GroundMoves.No;

	const { from, to } = command.target;
	const fromGround = from?.place === DuelPlace.Ground;
	const toGround = to?.place === DuelPlace.Ground;
	const toNonGround = to?.place !== DuelPlace.Ground;

	if (fromGround && toGround) {
		return GroundMoves.Relocate;
	} else if (fromGround && toNonGround) {
		return GroundMoves.Removal;
	}
};
