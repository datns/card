import { Node, Vec2, Vec3 } from 'cc';

const screenSize = new Vec2(1280, 720);

export interface System {
	dragging: boolean;
	activeCard?: Node;
}

export const system: System = {
	dragging: false,
};

export const setCursor = (cursor: string): void => {
	const canvas = document?.getElementById?.('GameCanvas');
	if (!canvas) return;
	canvas.style.cursor = cursor;
};

export const extractMouseLocation = ({ x, y }: Vec2): Vec3 => {
	return new Vec3(x - screenSize.x / 2, y - screenSize.y / 2, 0);
};
