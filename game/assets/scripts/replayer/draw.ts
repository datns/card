import { DuelCommandBundle, DuelPhases } from '@metacraft/murg-engine';

import { system } from '../util/system';

export const runDraw = async ({
	phase,
	phaseOf,
	commands,
	turn,
}: DuelCommandBundle) => {
	if (turn === 0) {
		console.log('initial draw');
	}
};
