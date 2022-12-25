import { Node, Vec3 } from 'cc';

import { system } from './system';

export const getExpoPositions = (
	size: number,
	centerNode: Node = system.globalNodes.expoCenter,
	spacing = 220,
): Vec3[] => {
	const positions: Vec3[] = [];
	const center = centerNode.getPosition();
	console.log(center);
	const totalSpace = spacing * size;
	const totalRadius = totalSpace / 2;
	const itemRadius = spacing / 2;

	for (let i = 0; i < size; i += 1) {
		const offset = i * spacing - totalRadius + itemRadius;
		positions.push(new Vec3(offset, center.y, 0));
	}

	return positions;
};
