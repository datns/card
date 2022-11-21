import React, { FC } from 'react';
import {
	createDrawerNavigator,
	DrawerContentComponentProps,
} from '@react-navigation/drawer';
import HomeScreen from 'screens/Home';
import CardsStack from 'stacks/Browser/Cards';
import GameStack from 'stacks/Browser/Game';
import GuideScreen from 'stacks/Browser/Guide';
import MarketplaceStack from 'stacks/Browser/Marketplace';
import MintStack from 'stacks/Browser/Mint';
import { drawerScreenOptions } from 'stacks/Browser/shared';

import DrawerMenu from './DrawerMenu';

const Drawer = createDrawerNavigator();

export const Mobile: FC = () => {
	const renderDrawer = (props: DrawerContentComponentProps) => (
		<DrawerMenu {...props} />
	);

	return (
		<Drawer.Navigator
			useLegacyImplementation
			screenOptions={drawerScreenOptions}
			drawerContent={renderDrawer}
		>
			<Drawer.Screen name="Home" component={HomeScreen} />
			<Drawer.Screen name="Game" component={GameStack} />
			<Drawer.Screen name="Cards" component={CardsStack} />
			<Drawer.Screen name="Marketplace" component={MarketplaceStack} />
			<Drawer.Screen name="Mint" component={MintStack} />
			<Drawer.Screen name="Guide" component={GuideScreen} />
		</Drawer.Navigator>
	);
};

export default Mobile;
