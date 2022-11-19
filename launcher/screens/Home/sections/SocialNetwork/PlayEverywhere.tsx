import React, { FC } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import { navigate } from 'stacks/Browser/shared';

import { buttonList, ButtonText } from './shared';

const PlayEverywhere: FC = () => {
	const onButtonPress = (item: ButtonText) => {
		if (item.title === 'Play on Web') {
			navigate('Game', { screen: 'Duel', params: { id: 'demo' } });
		}
	};

	const buttonSubText = (index: number, isAvailable: boolean) =>
		index === 0
			? 'Available in Dec 2022'
			: isAvailable
			? 'Now Available'
			: 'Coming soon';

	return (
		<View style={styles.container}>
			<Text style={sharedStyle.heading} responsiveSizes={headingSize}>
				Play everywhere
			</Text>
			<Text style={sharedStyle.subContent}>
				Easily access and enjoy Under Realm: Rise of Magic anywhere, anytime at
				ease.
			</Text>
			<View style={styles.buttonContainer}>
				{buttonList.map((item, index) => (
					<UnderRealmButton
						key={index}
						style={styles.button}
						isSubButton={!item.isAvailable}
						disabled={!item.isAvailable}
						onPress={() => onButtonPress(item)}
					>
						<View style={{ alignItems: 'center' }}>
							<Text
								style={[
									sharedStyle.buttonText,
									!item.isAvailable && styles.disableTextColor,
								]}
							>
								{item.title}
							</Text>
							<Text
								style={[
									styles.buttonSubText,
									!item.isAvailable && styles.disableTextColor,
								]}
							>
								{buttonSubText(index, item.isAvailable)}
							</Text>
						</View>
					</UnderRealmButton>
				))}
			</View>
		</View>
	);
};

export default PlayEverywhere;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	buttonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	button: {
		width: 220,
		marginTop: 15,
		marginHorizontal: 10,
		height: 45,
		paddingVertical: 0,
		justifyContent: 'center',
	},
	buttonSubText: {
		fontSize: 10,
		color: '#fff',
		fontWeight: '300',
	},
	disableTextColor: {
		color: '#989898',
	},
});
