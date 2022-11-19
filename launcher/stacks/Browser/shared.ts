import {
	createNavigationContainerRef,
	LinkingOptions,
	NavigatorScreenParams,
} from '@react-navigation/native';
import { StackNavigationOptions } from '@react-navigation/stack';

export const screenOptions: StackNavigationOptions = {
	headerShown: false,
	animationEnabled: false,
};

export type HomeParamList = {
	Dashboard: undefined;
};

export type GameParamList = {
	Dashboard: undefined;
	Duel: {
		id: string;
	};
};

export type MarketplaceParamList = {
	Dashboard: undefined;
	DetailCard: {
		id: string;
	};
};

export type CardsParamList = {
	Dashboard: undefined;
};

export type MintParamList = {
	Dashboard: undefined;
	DetailPack: {
		id: string;
	};
};

export type GuideParamList = {
	Dashboard: undefined;
};

export type RootParamList = {
	Home: NavigatorScreenParams<HomeParamList>;
	Game: NavigatorScreenParams<GameParamList>;
	Cards: NavigatorScreenParams<CardsParamList>;
	Marketplace: NavigatorScreenParams<MarketplaceParamList>;
	Mint: NavigatorScreenParams<MintParamList>;
	Guide: NavigatorScreenParams<GuideParamList>;
	AuthResponse: undefined;
};

export const linking: LinkingOptions<RootParamList> = {
	prefixes: ['https://underrealm.stormgate.io'],
	config: {
		screens: {
			Home: {
				path: '/',
				screens: {
					Dashboard: '/',
				},
			},
			Game: {
				path: '/game',
				screens: {
					Dashboard: '/',
					Duel: '/duel/:id',
				},
			},
			Cards: {
				path: '/cards',
				screens: {
					Dashboard: '/',
				},
			},
			Marketplace: {
				path: '/marketplace',
				screens: {
					Dashboard: '/',
					DetailCard: '/detail/:id',
				},
			},
			Mint: {
				path: '/mint',
				screens: {
					Dashboard: '/',
					DetailPack: '/:id',
				},
			},
			Guide: {
				path: '/guide',
				screens: {
					Dashboard: '/',
				},
			},
			AuthResponse: '/authreponse',
		},
	},
};

export const navigationRef = createNavigationContainerRef<RootParamList>();

export const navigate = (
	name: keyof RootParamList,
	params?: RootParamList[keyof RootParamList],
): void => {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name as never, params as never);
	}
};
