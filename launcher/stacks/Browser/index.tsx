import { FC } from 'react';
import { themeState } from '@metacraft/ui';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from 'screens/Home';
import { useSnapshot } from 'utils/hook';

import CardsStack from './Cards';
import GameStack from './Game';
import GuideScreen from './Guide';
import MarketplaceStack from './Marketplace';
import MintStack from './Mint';
import { linking, navigationRef, RootParamList, screenOptions } from './shared';

const Stack = createStackNavigator<RootParamList>();

export const BrowserStack: FC = () => {
	const theme = useSnapshot(themeState);

	return (
		<NavigationContainer ref={navigationRef} linking={linking} theme={theme}>
			<Stack.Navigator screenOptions={screenOptions}>
				<Stack.Screen name="Home" component={HomeScreen} />
				<Stack.Screen name="Game" component={GameStack} />
				<Stack.Screen name="Cards" component={CardsStack} />
				<Stack.Screen name="Marketplace" component={MarketplaceStack} />
				<Stack.Screen name="Mint" component={MintStack} />
				<Stack.Screen name="Guide" component={GuideScreen} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default BrowserStack;
