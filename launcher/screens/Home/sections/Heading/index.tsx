import React, { FC } from 'react';
import { ImageBackground, StyleSheet, View } from 'react-native';
import {
	AnimateDirections,
	DimensionState,
	dimensionState,
	modalActions,
	ScaledSizes,
	Text,
} from '@metacraft/ui';
import { useNavigation } from '@react-navigation/native';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import UnderRealmButton from 'components/Marketplace/Button';
import GameSubscribe from 'components/modals/GameSubscribe';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const HeadingSection: FC = () => {
	const navigation = useNavigation();
	const { responsiveLevel, windowSize } =
		useSnapshot<DimensionState>(dimensionState);
	const logoSize = [720, 600, 500, 350][responsiveLevel];

	const showGameSubscribeModal = () => {
		modalActions.show({
			id: 'gameSubscribe',
			component: () => <GameSubscribe dimensions={windowSize} />,
			animateDirection: AnimateDirections.BottomRight,
		});
	};

	return (
		<ImageBackground
			source={resources.home.headingBackground}
			style={styles.container}
		>
			<UnderRealmLogo size={logoSize} />
			<View style={styles.headLineContainer}>
				<Text style={styles.headLine} responsiveSizes={responsiveHeadline}>
					Free-to-play Strategy Trading Card game
				</Text>
				<Text style={styles.headLine} responsiveSizes={responsiveHeadline}>
					built by community
				</Text>
			</View>
			<View style={styles.actionButtonContainer}>
				<UnderRealmButton
					style={styles.actionButton}
					onPress={() => navigation.navigate('Mint' as never)}
				>
					<Text style={styles.actionButtonText}>Mint</Text>
				</UnderRealmButton>
				<UnderRealmButton
					style={styles.actionButton}
					onPress={showGameSubscribeModal}
				>
					<Text style={styles.actionButtonText}>Alpha Subscribe</Text>
				</UnderRealmButton>
			</View>
		</ImageBackground>
	);
};

export default HeadingSection;

const responsiveHeadline = [30] as ScaledSizes;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingVertical: 100,
		paddingHorizontal: 15,
	},
	headLineContainer: {
		alignItems: 'center',
		marginTop: 20,
	},
	headLine: {
		textAlign: 'center',
		fontWeight: '500',
		fontFamily: 'Volkhov',
		color: '#fff',
		textShadow: '0 0 5px black',
	},
	actionButtonContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
		marginVertical: 40,
	},
	actionButton: {
		width: 250,
		margin: 10,
	},
	actionButtonText: {
		textAlign: 'center',
		fontSize: 16,
		color: '#fff',
		textShadow: '0 0 10px black',
	},
});
