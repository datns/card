import React from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import {
	Card as ICard,
	ClassType,
	ElementalType,
	TemplateFragment,
} from '@metacraft/murg-engine';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

function getElementalByValue(value?: string): string {
	const indexOfS = Object.values(ElementalType).indexOf(
		value as unknown as ElementalType,
	);

	return Object.keys(ElementalType)[indexOfS];
}
function getClassByValue(value?: string): string {
	const indexOfS = Object.values(ClassType).indexOf(
		value as unknown as ClassType,
	);

	return Object.keys(ClassType)[indexOfS];
}

interface Props {
	data: ICard;
}

export const CARD_WIDTH = 180;

const Card: React.FC<Props> = ({ data }) => {
	const { elemental, attribute, rarity, name, id, skill } = data;
	const visualUri = `https://raw.githubusercontent.com/cocrafts/card/master/game/assets/resources/graphic/visuals/${id.slice(
		0,
		5,
	)}.png`;

	const sourceFoil = elemental
		? resources.card.foil[getElementalByValue(elemental).toLowerCase()]
		: resources.card.foil.dark;

	const sourceClass =
		resources.card.class[getClassByValue(data.class).toLowerCase()];

	const renderRarity = () => {
		const rarityArr = Array.from({ length: rarity }, (_, i) => i);
		return (
			<View style={styles.rarityContainer}>
				{rarityArr.map((rarity) => {
					return (
						<Image
							key={rarity}
							source={resources.card.gem}
							style={styles.gem}
						/>
					);
				})}
			</View>
		);
	};

	const renderSkill = () => {
		const fragments = skill?.template as TemplateFragment[];

		return (
			<Text style={styles.skill}>
				{fragments.map((fragment, i) => {
					return (
						<Text
							key={i}
							style={{
								...fragment.style,
								color: fragment.style?.color || 'gray',
							}}
							responsiveSizes={[6]}
						>
							{fragment.text}
						</Text>
					);
				})}
			</Text>
		);
	};

	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.visualContainer}>
				<Image
					source={{
						uri: visualUri,
					}}
					style={styles.foil}
					resizeMode="contain"
				/>
			</View>

			<ImageBackground source={sourceFoil} style={styles.foil}>
				{renderRarity()}
				<Text responsiveSizes={[11]} style={styles.name}>
					{name}
				</Text>
				<View style={styles.attributeContainer}>
					<Text responsiveSizes={[9]} style={styles.attributeLabel}>
						{attribute?.attack}
					</Text>
					<Text responsiveSizes={[9]} style={styles.attributeLabel}>
						{attribute?.defense}
					</Text>
					<Text responsiveSizes={[9]} style={styles.attributeLabel}>
						{attribute?.health}
					</Text>
				</View>
				{renderSkill()}
				<Image source={sourceClass} style={styles.classIcon} />
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		width: CARD_WIDTH,
		aspectRatio: 400 / 562,
	},
	name: {
		fontFamily: 'Volkhov',
		textAlign: 'center',
		color: '#000',
		marginTop: 16,
	},
	classIcon: {
		aspectRatio: 1,
		width: 10,
		position: 'absolute',
		bottom: 10,
		alignSelf: 'center',
	},
	foil: {
		flex: 1,
	},
	visualContainer: {
		width: '100%',
		height: '100%',
		alignSelf: 'center',
		position: 'absolute',
		padding: 15,
	},
	attributeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		bottom: 70,
		width: '100%',
		paddingHorizontal: 20,
	},
	attributeLabel: {
		fontWeight: '600',
		width: 14,
		textAlign: 'center',
	},
	rarityContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		top: 6,
		position: 'absolute',
		alignSelf: 'center',
	},
	gem: {
		width: 8,
		height: 8,
		marginHorizontal: 1,
	},
	skill: {
		position: 'absolute',
		top: 190,
		paddingHorizontal: 25,
	},
});
