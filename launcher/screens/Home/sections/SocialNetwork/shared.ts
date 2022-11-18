export interface ButtonText {
	title: string;
	isAvailable: boolean;
	link?: string;
}

export const buttonList: ButtonText[] = [
	{
		title: 'Play on Web',
		isAvailable: false,
	},
	{
		title: 'Mobile App',
		isAvailable: false,
	},
	{
		title: 'Desktop App',
		isAvailable: false,
	},
];
