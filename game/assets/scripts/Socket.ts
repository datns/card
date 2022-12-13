export const ws = new WebSocket(
	'wss://nkibdowafa.execute-api.ap-northeast-1.amazonaws.com/prod/',
);

ws.onmessage = (item) => {
	console.log(item);
};

ws.onopen = () => {
	ws.send('hello world!');
};
