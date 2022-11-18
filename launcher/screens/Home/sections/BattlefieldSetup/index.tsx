import React, { FC } from 'react';
import {
	ImageBackground,
	ScaledSize,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import { Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import { navigate } from 'stacks/Browser/shared';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

interface Props {
	dimension: ScaledSize;
}

const BattlefieldSetupSection: FC<Props> = ({ dimension }) => {
	const width = Math.min(dimension.width, iStyles.contentContainer.maxWidth);
	const backgroundContainer = {
		width,
		height: (width * 1033) / 1728,
		alignItems: 'center',
		justifyContent: 'center',
		paddingHorizontal: 15,
	} as ViewStyle;

	const onHowToPlayButtonPressed = () =>
		navigate('Guide', { screen: 'Dashboard' });

	return (
		<View style={styles.container}>
			<ImageBackground
				source={resources.home.battlefieldBackground}
				style={[iStyles.wideContainer, backgroundContainer]}
			>
				<Text
					style={[sharedStyle.heading, styles.textShadow]}
					responsiveSizes={headingSize}
				>
					Know Your Battlefield
				</Text>
				<Text style={[sharedStyle.subContent, styles.textShadow]}>
					Under Realm: Rise of Magic is designed to be a well balanced between
					using the combination of your cards and deploying them in an effective
					formation on the battlefield.
				</Text>
				<UnderRealmButton
					style={styles.button}
					onPress={onHowToPlayButtonPressed}
				>
					<Text style={styles.buttonText}>How to play</Text>
				</UnderRealmButton>
			</ImageBackground>
		</View>
	);
};

export default BattlefieldSetupSection;

const styles = StyleSheet.create({
	container: {
		paddingBottom: 40,
	},
	button: {
		width: 220,
	},
	textShadow: {
		textShadow: '0 0 10px black',
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
});
