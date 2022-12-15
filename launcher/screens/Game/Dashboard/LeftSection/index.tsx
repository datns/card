import React, { FC } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { dimensionState, Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { useSnapshot } from 'utils/hook';
import { iStyles } from 'utils/styles';

import LeaderBoard from './LeaderBoard';
import StatisticBoard from './StatisticBoard';

export const LeftSection: FC = () => {
	const { windowSize } = useSnapshot(dimensionState);

	return (
		<View style={iStyles.contentContainer}>
			<Text style={styles.heading}>Blind Duel</Text>
			<View style={[styles.rowContainer, { marginBottom: 40 }]}>
				<Text style={styles.subText}>
					Are you ready to face the unknown enemy? Do your best and winning
					might be on your side, Adventurer!
				</Text>
				<UnderRealmButton style={styles.button}>
					<Text
						style={styles.buttonText}
						onPress={() =>
							Linking.openURL('https://underrealm.stormgate.io/game/duel/demo')
						}
					>
						Play
					</Text>
				</UnderRealmButton>
			</View>
			<View style={styles.rowContainer}>
				<LeaderBoard windowSize={windowSize} />
				<StatisticBoard />
			</View>
		</View>
	);
};

export default LeftSection;

const styles = StyleSheet.create({
	container: {},
	heading: {
		fontFamily: 'Volkhov',
		fontSize: 50,
		marginBottom: 15,
	},
	rowContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
	},
	subText: {
		fontSize: 18,
		maxWidth: 600,
	},
	button: {
		width: 180,
	},
	buttonText: {
		textAlign: 'center',
		fontSize: 18,
	},
});
