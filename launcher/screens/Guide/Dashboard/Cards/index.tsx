import React, { useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import ConceptButton from 'screens/Guide/Dashboard/ConceptButton';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const concepts: { label: string; icon: number; content: string }[] = [
	{
		label: 'Hero',
		icon: resources.guide.heroIcon,
		content:
			'Class: Each monster card will belong to a class, and each class will have different pros and cons.\n' +
			'Attack Point\n' +
			'Heath Point: when heath point reduce to 0, it will be move to grave yard\n' +
			'Defense Point: (some monster will has it by default, but some will get by spell/ card or skill), reduce the damage it takes by %, maximum is 50%\n' +
			'Skill:\n' +
			'            - Passive: skill has no cooldown to active, It will active if meets the condition\n' +
			'            - Active: Auto active before battle, after activated it will be countdown by turn before active it again (countdown by turn)',
	},
	{
		label: 'Spell',
		icon: resources.guide.spellIcon,
		content:
			'Spell cards do not have **a** set amount of attack/ defense/ health points on the card design.\n' +
			'Spell cards can be used to cast potentially match-turning spells determined by their abilities. Use spell cards to reinforce your creatures and play style, from supportive to damaging spells. Once a spell card has been used, the card will be sent to the void.',
	},
	{
		label: 'Troop',
		icon: resources.guide.troopIcon,
		content: 'Troop: \n Special Troop: summoned by Hero’s skill',
	},
];

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingBottom: 150,
	},
	subHeading: {
		fontFamily: 'Poppins',
		fontSize: 30,
		textAlign: 'center',
		marginTop: 15,
		marginBottom: 8,
	},
	content: {
		fontFamily: 'Poppins',
		textAlign: 'center',
	},
	conceptContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	cardInfo: {
		fontFamily: 'Poppins',
		marginTop: 50,
		width: '100%',
	},
	propertyTitle: {
		fontFamily: 'Poppins',
		fontSize: 30,
		marginTop: 40,
		marginBottom: 8,
		color: '#67564C',
		alignSelf: 'flex-start',
	},
	propertyContent: {
		fontFamily: 'Poppins',
	},
	elementVisual: {
		flexDirection: 'row',
		marginTop: 40,
		flexWrap: 'wrap',
		justifyContent: 'center',
		width: '100%',
	},
	elementVisualImg: {
		width: '55%',
		aspectRatio: 701 / 703,
		marginHorizontal: 60,
	},
	elementVisualContent: {
		justifyContent: 'center',
		paddingTop: 80,
	},
	interactionTitle: {
		fontFamily: 'Volkhov',
		fontWeight: 'bold',
		fontSize: 18,
	},
	interactionContent: {
		fontFamily: 'Poppins',
		fontSize: 12,
	},
	interactionNote: {
		fontStyle: 'italic',
		opacity: 0.7,
	},
});

const Cards: React.FC<Record<string, unknown>> = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const [selectedConcept, setSelectedConcept] = useState<number>(0);
	const imageWidth = responsiveLevel > 1 ? 1060 * (1 / responsiveLevel) : 803;
	const imageStyle = {
		width: imageWidth,
		height: (imageWidth * 756) / 1060,
		marginVertical: 40,
	};
	return (
		<View
			style={[
				sharedStyle.sectionContainer,
				styles.container,
				{ width: imageWidth },
			]}
		>
			<Text responsiveSizes={headingSize} style={sharedStyle.heading}>
				Cards
			</Text>
			<Text style={styles.subHeading}>Getting to know your Card</Text>
			<Text style={styles.content}>
				This quick read will teach you how to distinguish between the many types
				and classes of cards that are available in Under Realm: Rise of Magic,
				identify their characteristics, and maybe provide you with some advice
				and ideas on the kinds of strategy you can build.
			</Text>
			<Image source={resources.guide.cardExplain} style={imageStyle} />
			<View
				style={[
					styles.conceptContainer,
					{
						width: imageWidth,
					},
				]}
			>
				{concepts.map((concept, index) => {
					return (
						<ConceptButton
							label={concept.label}
							icon={concept.icon}
							isFirst={index === 0}
							isLast={index === concepts.length - 1}
							key={concept.label}
							onPress={() => setSelectedConcept(index)}
							isSelected={index === selectedConcept}
						/>
					);
				})}
			</View>
			<Text style={styles.cardInfo}>{concepts[selectedConcept].content}</Text>
			<Text style={styles.propertyTitle}>Card Rarity</Text>
			<Text style={styles.propertyContent}>
				Card rarity can be recognized by the gems on the top of the card. Cards
				with higher rarities is harder to acquire in the [NFT Minting Event] as
				they have a lower drop rate. Cards can be 1 of 7 rarities: Card Rarity
				is going to be the most important index you need to get your attention
				as it will be determined how powerful this card is in general. Cards
				with higher rarities are harder to acquire in the NFT Minting Event as
				they have a lower drop rate. Cards can be 1 of 6 major rarities, and
				each major rarity includes 3 levels of minor rarities.
			</Text>
			<Text style={styles.propertyTitle}>5 Hero Classes</Text>
			<Text style={styles.propertyContent}>
				There are 5 main classes that represents different philosophies,
				playstyle and strategies. Knowing the specialty of your card class will
				create a huge advantage for you on the battlefield.
			</Text>
			<Text style={styles.propertyTitle}>Elemental</Text>
			<Text style={styles.propertyContent}>
				Card elements can be identified by the color of the orb. Each card will
				have an element and the element will interact uniquely on the
				battlefield as the Generating and Overcoming processes. Knowing this
				will give you an extra chance to win a battle by combining the action of
				cards accordingly.
			</Text>
			<View style={styles.elementVisual}>
				<Image
					source={resources.guide.elementalInteractionVisual}
					style={styles.elementVisualImg}
				/>
				<View style={styles.elementVisualContent}>
					<Text style={styles.interactionTitle}>
						{'Overcoming Interactions\n\n'}
					</Text>
					<Text style={styles.interactionContent}>
						{'Fire melts Metal\n\n' +
							'Metal penetrates Wood\n\n' +
							'Wood separates Earth\n\n' +
							'Earth absorbs Water\n\n' +
							'Water quenches Fire\n\n'}
					</Text>
					<Text style={[styles.interactionContent, styles.interactionNote]}>
						*Light & Dark: Not available in Alpha yet.
					</Text>
				</View>
			</View>
		</View>
	);
};

export default Cards;
