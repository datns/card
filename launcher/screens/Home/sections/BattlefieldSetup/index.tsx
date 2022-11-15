import React, { FC } from 'react';
import {
	ImageBackground,
	ScaledSize,
	StyleSheet,
	ViewStyle,
} from 'react-native';
import { Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

interface Props {
	dimension: ScaledSize;
}

const BattlefieldSetupSection: FC<Props> = ({ dimension }) => {
	const width = Math.min(dimension.width, iStyles.contentContainer.maxWidth);
	const container = {
		width,
		height: (width * 1033) / 1728,
		alignItems: 'center',
		justifyContent: 'center',
	} as ViewStyle;

	return (
		<ImageBackground
			source={resources.home.battlefieldBackground}
			style={[iStyles.wideContainer, container]}
		>
			<Text
				style={[sharedStyle.heading, styles.textShadow]}
				responsiveSizes={headingSize}
			>
				Battlefield Setup
			</Text>
			<Text style={[sharedStyle.subContent, styles.textShadow]}>
				Under Realm: Rise of Magic is designed to be well balance between using
				the combination of your cards and deploy them in an effective formation
				on the battlefield.
			</Text>
			<UnderRealmButton style={styles.button}>
				<Text style={styles.buttonText}>How to play</Text>
			</UnderRealmButton>
		</ImageBackground>
	);
};

export default BattlefieldSetupSection;

const styles = StyleSheet.create({
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
