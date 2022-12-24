import { Node, Vec3 } from 'cc';

import { system } from './system';

export const expoLayout = (
	fromNode: Node = system.globalNodes.expo,
): Vec3[] => {
	const central = fromNode.getWorldPosition();

	return [];
};
