import Engine, { DuelCommandBundle } from '@metacraft/murg-engine';
import { getGroundExpos } from 'db://assets/scripts/util/layout';

import {
	animateGroundRemoval,
	animateRelocate,
	animateUnitRaise,
} from '../tween';
import { extractGroundMove, GroundMoves } from '../util/command';
import { system } from '../util/system';

const { CommandSourceType } = Engine;

const skillSources = [
	CommandSourceType.InspiredSkill,
	CommandSourceType.PostFightSkill,
	CommandSourceType.PreFightSkill,
];

export const playGeneric = async ({
	commands,
}: DuelCommandBundle): Promise<void> => {
	for (let i = 0; i < commands.length; i += 1) {
		const command = commands[i];
		const isSkillCasting =
			skillSources.indexOf(command.target?.source?.type) >= 0;
		const groundMove = extractGroundMove(command);

		if (isSkillCasting) {
			const node = system.cardRefs[command.target.source.id];
			if (node) await animateUnitRaise(node);
		}

		if (groundMove === GroundMoves.Removal) {
			const node = system.cardRefs[command.target.from.id];
			if (node) await animateGroundRemoval(node);
		} else if (groundMove === GroundMoves.Relocate) {
			const node = system.cardRefs[command.target.from.id];

			if (node) {
				const owner = command.target.to.owner;
				const isMine = owner === system.playerIds.me;
				const groundGuide = isMine
					? system.globalNodes.playerGroundGuide
					: system.globalNodes.enemyGroundGuide;
				const expos = getGroundExpos(groundGuide);

				await animateRelocate(node, expos[command.target.to.index]);
			}
		}
	}
};
