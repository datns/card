import { Node, Vec3 } from 'cc';

import { getGroundSize } from './helper';
import { system } from './system';

export const getPositionExpos = (
	centerNode: Node = system.globalNodes.expoCenter,
	size: number,
	spacing = 220,
): Vec3[] => {
	const positions: Vec3[] = [];
	const center = centerNode.getPosition();
	const totalSpace = spacing * size;
	const totalRadius = totalSpace / 2;
	const itemRadius = spacing / 2;

	for (let i = 0; i < size; i += 1) {
		const offset = i * spacing - totalRadius + itemRadius;
		positions.push(new Vec3(offset, center.y, 0));
	}

	return positions;
};

export const getDistributeExpos = (size: number): Vec3[] => {
	return getPositionExpos(system.globalNodes.expoCenter, size, 220);
};

export const getHandExpos = (at: Node, size: number): Vec3[] => {
	return getPositionExpos(at, size, 80);
};

export const getGroundExpos = (at: Node): Vec3[] => {
	return getPositionExpos(at, getGroundSize(), 100);
};
