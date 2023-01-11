import React from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

type ClassType = 'assassin' | 'knight' | 'tanker' | 'wizard' | 'summoner';
// | 'beast';

const ClassMapping: Record<string, ClassType> = {
	'01': 'assassin',
	'02': 'knight',
	'03': 'tanker',
	'04': 'wizard',
	'05': 'summoner',
	// '06': 'beast',
};

type ElementalType =
	| 'metal'
	| 'wood'
	| 'water'
	| 'fire'
	| 'earth'
	| 'light'
	| 'dark';

const ElementalMapping: Record<string, ElementalType> = {
	'01': 'metal',
	'02': 'wood',
	'03': 'water',
	'04': 'fire',
	'05': 'earth',
	'06': 'light',
	'07': 'dark',
};

interface Props {
	attribute: {
		attack: number;
		defense: number;
		health: number;
	};
	class: string;
	elemental: string;
	rarity: number;
	name: string;
	id: string;
}

const Card: React.FC<Props> = (props) => {
	const { elemental, attribute, rarity, name, id } = props;

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

	return (
		<TouchableOpacity style={styles.container}>
			<View style={styles.visualContainer}>
				<Image
					source={{
						uri: `https://raw.githubusercontent.com/cocrafts/card/master/game/assets/resources/graphic/visuals/${id.slice(
							0,
							5,
						)}.png`,
					}}
					style={styles.foil}
					resizeMode="contain"
				/>
			</View>

			<ImageBackground
				source={resources.card.foil[ElementalMapping[elemental]]}
				style={styles.foil}
			>
				{renderRarity()}
				<Text responsiveSizes={[20]} style={styles.name}>
					{name}
				</Text>
				<View style={styles.attributeContainer}>
					<Text responsiveSizes={[20]} style={{ fontWeight: '600' }}>
						{attribute.attack}
					</Text>
					<Text responsiveSizes={[20]} style={{ fontWeight: '600' }}>
						{attribute.defense}
					</Text>
					<Text responsiveSizes={[20]} style={{ fontWeight: '600' }}>
						{attribute.health}
					</Text>
				</View>
				<Image
					source={resources.card.class[ClassMapping[props.class]]}
					style={styles.classIcon}
				/>
			</ImageBackground>
		</TouchableOpacity>
	);
};

export default Card;

const styles = StyleSheet.create({
	container: {
		width: 400,
		height: 562,
	},
	name: {
		fontFamily: 'Volkhov',
		textAlign: 'center',
		color: '#000',
		marginTop: 10,
	},
	classIcon: {
		aspectRatio: 1,
		width: 28,
		position: 'absolute',
		bottom: 20,
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
		bottom: 158,
		width: '100%',
		paddingHorizontal: 49,
	},
	rarityContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
		marginTop: 14,
	},
	gem: {
		width: 15,
		height: 15,
		marginHorizontal: 3,
	},
});
