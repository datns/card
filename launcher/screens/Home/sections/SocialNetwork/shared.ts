import { navigate } from 'stacks/Browser/shared';

export interface ButtonText {
	title: string;
	isAvailable: boolean;
	onPress?: () => void;
}

export const buttonList: ButtonText[] = [
	{
		title: 'Play on Web',
		isAvailable: true,
		onPress: () => navigate('Game'),
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
