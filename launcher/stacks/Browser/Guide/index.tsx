import { FC } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import GuideDashboard from '../../../screens/Guide/Dashboard';
import { GameParamList, stackScreenOptions } from '../shared';

const Stack = createStackNavigator<GameParamList>();

const GuideStack: FC = () => {
	return (
		<Stack.Navigator screenOptions={stackScreenOptions}>
			<Stack.Screen name="Dashboard" component={GuideDashboard} />
		</Stack.Navigator>
	);
};

export default GuideStack;
