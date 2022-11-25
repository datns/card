export interface NaviItem {
	id: string;
	title: string;
	screen: string;
}

export const naviItemList: NaviItem[] = [
	{
		id: 'mint',
		title: 'Mint',
		screen: 'Mint',
	},
	{
		id: 'guide',
		title: 'Guide',
		screen: 'Guide',
	},
];
