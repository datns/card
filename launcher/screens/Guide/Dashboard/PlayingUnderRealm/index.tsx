import React, { FC, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import ConceptButton from 'screens/Guide/Dashboard/ConceptButton';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const concepts: { label: string; icon: number; content: string }[] = [
	{
		label: 'Draw',
		icon: resources.guide.drawIcon,
		content:
			'Draw card\nEach turn, draw 1 Hero card + 1 Troop Each 3 turns both players draw 5 spell cards select 3 and discard 2',
	},
	{
		label: 'Setup',
		icon: resources.guide.setupIcon,
		content:
			'Setup card\n' +
			'Place 1 Hero Card in the center and 1 Troop Card from any side (Turn 1)\n' +
			'Setup spell if needed in tower\tInitially, both teams have 2 tower. After every 5 turns, 1 more tower will be added\n' +
			'X seconds to setup\n' +
			'Confirm',
	},
	{
		label: 'Battle',
		icon: resources.guide.battleIcon,
		content:
			'Battle\n' +
			'After 2 players complete Card setup, Spell and all other card is played automatically\n' +
			'Attack Both sides attack at the same time\n' +
			"Which card isn't face enemy card will attack directly to the wall.",
	},
	{ label: 'Grave', icon: resources.guide.graveIcon, content: '' },
];

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	subHeading: {
		textAlign: 'center',
	},
	conceptContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 40,
	},
});

const PlayingUnderRealm: FC<Record<string, unknown>> = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const [selectedConcept, setSelectedConcept] = useState<number>(0);
	const imageWidth = responsiveLevel > 1 ? 803 * (1 / responsiveLevel) : 803;
	const imageStyle = {
		width: imageWidth,
		height: (imageWidth * 483) / 803,
		marginTop: 40,
	};
	return (
		<View style={[styles.container, iStyles.wideContainer]}>
			<Text
				responsiveSizes={headingSize}
				style={[sharedStyle.heading, sharedStyle.textShadow]}
			>
				Playing Under Realm
			</Text>
			<Text style={[sharedStyle.subHeading, styles.subHeading]}>
				{
					"To win the game, player is required to: Reduce the opposing player's Health Points to zero"
				}
			</Text>
			<View style={[styles.conceptContainer, { width: imageWidth }]}>
				{concepts.map(({ label, icon }, index) => {
					const handlePress = () => setSelectedConcept(index);
					return (
						<ConceptButton
							onPress={handlePress}
							label={label}
							icon={icon}
							key={label}
							isFirst={index === 0}
							isLast={index === concepts.length - 1}
						/>
					);
				})}
			</View>
			<Text style={{ width: imageWidth, fontFamily: 'Poppins' }}>
				{concepts[selectedConcept].content}
			</Text>
			<Image source={resources.guide.battlefieldImage} style={imageStyle} />
		</View>
	);
};

export default PlayingUnderRealm;
