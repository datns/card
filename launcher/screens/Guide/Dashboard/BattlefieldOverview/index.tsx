import React from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import ConceptButton from 'screens/Guide/Dashboard/ConceptButton';
import { sharedStyle } from 'screens/Guide/shared';
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
			<View style={{ width: imageWidth }}>
				<View style={[styles.conceptContainer, { width: imageWidth }]}>
					{concepts.map(({ label, icon }, index) => {
						return (
							<ConceptButton
								label={label}
								icon={icon}
								key={label}
								isFirst={index === 0}
								isLast={index === concepts.length - 1}
							/>
						);
					})}
				</View>
				<Text style={sharedStyle.subHeading}>
					Cards on your hand are drawn from your Deck. You will start with 5
					Cards and receive more cards at each turn. At each turn, a glowing
					green border indicates your turn to play and which card is playable.
					Max. 7 cards can be held in your hand. Once exceed, you will have to
					discard ....
				</Text>
				<Image source={resources.guide.battlefieldImage} style={imageSize} />
			</View>
		</ImageBackground>
	);
};

export default BattlefieldOverview;
