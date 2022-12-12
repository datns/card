import React, { FC } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import PlayingUnderRealm from 'screens/Guide/Dashboard/PlayingUnderRealm';

import BattlefieldOverview from './BattlefieldOverview';
import Header from './Header';

const GuideDashboard: FC = () => {
	return (
		<ScrollView style={styles.container}>
			<Header />
			<BattlefieldOverview />
			<PlayingUnderRealm />
		</ScrollView>
	);
};

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: '#000',
	},
	background: {
		width: 200,
	},
	headingBackground: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Volkhov',
	},
	subHeading: {
		fontSize: 10,
		color: '#EBEBEB',
		textAlign: 'center',
		maxWidth: 800,
		marginHorizontal: 24,
	},
});

export default GuideDashboard;
