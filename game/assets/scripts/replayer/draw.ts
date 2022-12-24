import { DuelCommandBundle } from '@metacraft/murg-engine';

import { expoLayout } from '../util/layout';

export const runDraw = async ({
	phase,
	phaseOf,
	commands,
	turn,
}: DuelCommandBundle) => {
	if (turn === 0) {
		const expoPositions = expoLayout();
		console.log('initial draw', expoPositions);
	}
};
