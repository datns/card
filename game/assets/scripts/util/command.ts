import Engine, { DuelCommand } from '@metacraft/murg-engine';

const { DuelCommandType, DuelPlace } = Engine;

export enum GroundMoves {
	No,
	Removal,
	Relocate,
	GenerateFromAir,
}

const generatedPlaces = [DuelPlace.Player, DuelPlace.Ability];

export const extractGroundMove = (command: DuelCommand): GroundMoves => {
	console.log(command.type);
	if (command.type !== DuelCommandType.CardMove) return GroundMoves.No;

	const { from, to } = command.target;
	const fromGround = from?.place === DuelPlace.Ground;
	const toGround = to?.place === DuelPlace.Ground;
	const fromDeck = from?.place === DuelPlace.Deck;
	const fromGrave = from?.place === DuelPlace.Grave;
	const fromAir = generatedPlaces.indexOf(from.place) >= 0;

	if (fromGround && toGround) {
		return GroundMoves.Relocate;
	} else if (toGround) {
		if (fromAir) {
			return GroundMoves.GenerateFromAir;
		} else if (fromDeck) {
			console.log('Card from Deck to Ground not supported yet!');
		} else if (fromGrave) {
			console.log('Card from Grave to Ground (i.e reborn) not supported yet!');
		}
	} else if (fromGround) {
		return GroundMoves.Removal;
	} else {
		console.log('Generic move not (non-ground) supported yet!');
	}

	return GroundMoves.No;
};
