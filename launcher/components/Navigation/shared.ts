import { RootParamList } from 'stacks/Browser/shared';

export interface NavigationConfig {
	title: string;
	url?: string;
	route?: keyof RootParamList;
	params?: RootParamList[keyof RootParamList];
}

export const stormGateNav = {
	title: 'StormGate',
	url: 'https://stormgate.io',
};

export const stormNavigations: NavigationConfig[] = [
	{
		title: 'Bench',
		url: 'https://www.notion.so/stormgate/fe8ab9170c15417fbe25a725c14600e1?v=a5b8bd54102d46a28e82d01d633bd782',
	},
	{
		title: 'Tokenomic',
		url: 'https://docs.stormgate.io/whitepaper/tokenomic',
	},
	{
		title: 'Lore',
		url: 'https://stormgate.substack.com/p/welcome-to-atem-world-adventurers',
	},
	{
		title: 'News',
		url: 'https://stormgate.substack.com/',
	},
	{
		title: 'Docs',
		url: 'https://docs.stormgate.io/',
	},
];

export const homeNav: NavigationConfig = {
	title: 'Home',
	route: 'Home',
};

export const mintNav: NavigationConfig = {
	title: 'Mint',
	route: 'Mint',
	params: { screen: 'Dashboard' },
};

export const localNavigations: NavigationConfig[] = [
	homeNav,
	mintNav,
	// {
	// 	title: 'Game',
	// 	route: 'Game',
	// },
	// {
	// 	title: 'Marketplace',
	// 	route: 'Marketplace',
	// },
	// {
	// 	title: 'Cards',
	// 	route: 'Cards',
	// },
	// {
	// 	title: 'Support',
	// },
];

export const navigationHeight = {
	storm: 40,
	local: 68,
};
