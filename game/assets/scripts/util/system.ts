export const setCursor = (cursor: string): void => {
	const canvas = document.getElementById('GameCanvas');
	canvas.style.cursor = cursor;
};
