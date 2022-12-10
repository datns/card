import React from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import Animated from 'react-native-reanimated';
import { DimensionState, dimensionState, Hoverable, Text } from '@metacraft/ui';
import { sharedStyle, useHoveredStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const styles = StyleSheet.create({
	conceptContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'space-evenly',
		marginTop: 40,
	},
	conceptButton: {
		alignItems: 'center',
		marginHorizontal: 20,
	},
	conceptIcon: {
		width: 40,
		aspectRatio: 1,
	},
	hoverable: {
		alignItems: 'center',
	},
	battlefieldImage: {
		width: 803,
		height: 483,
	},
});

const concepts: { label: string; icon: number }[] = [
	{
		label: 'Hand',
		icon: resources.guide.handIcon,
	},
	{
		label: 'Deck',
		icon: resources.guide.deckIcon,
	},
	{
		label: 'Spell',
		icon: resources.guide.spellIcon,
	},
	{
		label: 'Grave',
		icon: resources.guide.graveIcon,
	},
	{
		label: 'Summon Zone',
		icon: resources.guide.summonZoneIcon,
	},
	{
		label: 'EndTurn',
		icon: resources.guide.endTurnIcon,
	},
	{
		label: 'HealthPoint',
		icon: resources.guide.healthPointIcon,
	},
	{
		label: 'History',
		icon: resources.guide.historyIcon,
	},
];

const BattlefieldOverview: React.FC<Record<string, unknown>> = () => {
	const { windowSize, responsiveLevel } =
		useSnapshot<DimensionState>(dimensionState);
	const width = Math.min(windowSize.width, iStyles.contentContainer.maxWidth);
	const imageWidth = responsiveLevel > 1 ? 803 * (1 / responsiveLevel) : 803;
	const backgroundContainer = {
		width,
		height: (width * 576) / 864,
		alignItems: 'center',
		paddingTop: 50,
	} as ViewStyle;

	const imageSize = {
		width: imageWidth,
		height: (imageWidth * 483) / 803,
		marginBottom: 20,
	};
	return (
		<ImageBackground
			source={resources.guide.mainBackground}
			style={[iStyles.wideContainer, backgroundContainer]}
		>
			<Text
				responsiveSizes={[35]}
				style={[sharedStyle.heading, sharedStyle.textShadow]}
			>
				Battlefield Overview
			</Text>
			<View style={styles.conceptContainer}>
				{concepts.map(({ label, icon }) => {
					return (
						<TouchableOpacity key={label} style={styles.conceptButton}>
							<Hoverable
								animatedStyle={useHoveredStyle}
								style={styles.hoverable}
							>
								<Animated.View>
									<Image source={icon} style={styles.conceptIcon} />
									<Text style={sharedStyle.textShadow}>{label}</Text>
								</Animated.View>
							</Hoverable>
						</TouchableOpacity>
					);
				})}
			</View>
			<Text style={sharedStyle.subContent}>
				Cards on your hand are drawn from your Deck. You will start with 5 Cards
				and receive more cards at each turn. At each turn, a glowing green
				border indicates your turn to play and which card is playable. Max. 7
				cards can be held in your hand. Once exceed, you will have to discard
				....
			</Text>
			<Image source={resources.guide.battlefieldImage} style={imageSize} />
		</ImageBackground>
	);
};

export default BattlefieldOverview;
