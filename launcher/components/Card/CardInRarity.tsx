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
import { getRarityTitle } from 'screens/Mint/shared';
import { navigate } from 'stacks/Browser/shared';
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

export const CARD_WIDTH = 90;

const getRarity = (level: number) => {
	if (level > 12) {
		return 'Immortal';
	} else if (level > 9) {
		return 'Legendary';
	} else if (level > 6) {
		return 'Mythical';
	} else if (level > 3) {
		return 'Epic';
	}

	return 'Rare';
};

const CardInRarity: React.FC<Props> = ({ data }) => {
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

	const onPress = () => {
		navigate('CardLibrary', { screen: 'DetailCard', params: { id } });
	};

	const renderRarity = () => {
		const rarityArr = Array.from({ length: rarity / 3 }, (_, i) => i);
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
							responsiveSizes={[3]}
						>
							{fragment.text}
						</Text>
					);
				})}
			</Text>
		);
	};

	return (
		<View>
			<TouchableOpacity style={styles.container} onPress={onPress}>
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
					<Text responsiveSizes={[5]} style={styles.name}>
						{name}
					</Text>
					<View style={styles.attributeContainer}>
						<Text responsiveSizes={[4]} style={styles.attributeLabel}>
							{attribute?.attack}
						</Text>
						<Text responsiveSizes={[4]} style={styles.attributeLabel}>
							{attribute?.defense}
						</Text>
						<Text responsiveSizes={[4]} style={styles.attributeLabel}>
							{attribute?.health}
						</Text>
					</View>
					{renderSkill()}
					<Image source={sourceClass} style={styles.classIcon} />
				</ImageBackground>
			</TouchableOpacity>
			<Text style={styles.rarity}>{getRarity(rarity)}</Text>
		</View>
	);
};

export default CardInRarity;

const styles = StyleSheet.create({
	container: {
		width: CARD_WIDTH,
		aspectRatio: 400 / 562,
	},
	name: {
		fontFamily: 'Volkhov',
		textAlign: 'center',
		color: '#000',
		marginTop: 8,
	},
	classIcon: {
		aspectRatio: 1,
		width: 5,
		position: 'absolute',
		bottom: 5,
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
		padding: 8,
	},
	attributeContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		bottom: 35,
		width: '100%',
		paddingHorizontal: 1,
	},
	attributeLabel: {
		fontWeight: '600',
		width: 25,
		textAlign: 'center',
	},
	rarityContainer: {
		flexDirection: 'row',
		top: 3,
		position: 'absolute',
		alignSelf: 'center',
		width: 25,
	},
	gem: {
		width: 4,
		height: 4,
		marginHorizontal: 0.6,
	},
	skill: {
		position: 'absolute',
		top: 88,
		paddingHorizontal: 15,
	},
	rarity: {
		color: '#e0dfdf',
		textAlign: 'center',
		marginTop: 10,
	},
});
