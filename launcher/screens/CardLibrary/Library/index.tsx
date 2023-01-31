import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import {
	Card as ICard,
	CardType as ICardType,
	makeMeta,
} from '@metacraft/murg-engine';
import { Text } from '@metacraft/ui';
import Card from 'components/Card';
import ScrollLayout from 'components/layouts/Scroll';
import UnderRealmButton from 'components/Marketplace/Button';
import { navigationHeight } from 'components/Navigation/shared';
import CardTypeButton from 'screens/CardLibrary/Library/CardTypeButton';
import Dropdown from 'screens/CardLibrary/Library/Dropdown';
import FilterButton from 'screens/CardLibrary/Library/FilterButton';
import SearchBar from 'screens/CardLibrary/Library/SearchBar';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import { Attribute, CardTypeContent, Classes, Elemental } from './content';

enum AllCardType {
	All = -1,
}

type ExtendedCardType = ICardType | AllCardType;

const Library: React.FC = () => {
	const [selectedType, setSelectedType] = React.useState<ExtendedCardType>(
		AllCardType.All,
	);
	const [search, setSearch] = React.useState<string>('');
	const [showSubFilter, setShowSubFilter] = React.useState<boolean>(false);
	const { map } = makeMeta('00001');
	const initialCardList = Object.values(map) as ICard[];
	const [cardList, setCardList] = React.useState<ICard[]>(initialCardList);
	console.log('map', map);

	const onChangeCardType = (cardType: ExtendedCardType) => {
		setSelectedType(cardType);
	};

	const onSearch = (text: string) => {
		setSearch(text);
	};

	React.useEffect(() => {
		let filteredByType = [];
		if (selectedType === AllCardType.All) {
			filteredByType = initialCardList;
		} else {
			filteredByType = initialCardList.filter(
				(value) => value.kind == selectedType,
			);
		}
		const searched = filteredByType.filter((card) =>
			card.name
				.toLowerCase()
				.includes(search.toLowerCase().trim().replace(/\s/g, '')),
		);
		setCardList(searched);
	}, [selectedType, search]);

	const renderSubFilter = () => {
		if (!showSubFilter) return null;
		return (
			<>
				<View
					style={{
						width: '70%',
						height: 1,
						backgroundColor: '#644d3d',
						marginTop: 10,
						marginBottom: 20,
					}}
				/>
				<View style={{ flexDirection: 'row' }}>
					<Dropdown
						data={Classes}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="Classes"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={Elemental}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="Elemental"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={Attribute}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="Attack"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={Attribute}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="Defense"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={Attribute}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="HP"
						containerStyle={styles.dropdownContainer}
					/>
				</View>
			</>
		);
	};

	const renderCardTypeSelector = () => {
		return (
			<View style={{ flexDirection: 'row' }}>
				{CardTypeContent.map((type) => {
					const isSelected = type.value === selectedType;
					return (
						<CardTypeButton
							key={type.value}
							isSelected={isSelected}
							type={type}
							onPress={() => onChangeCardType(type.value)}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<View style={[iStyles.wideContainer, styles.container]}>
			<Image
				source={resources.cardLibrary.mainBackground}
				style={styles.imageBackground}
			/>
			<ScrollLayout>
				<View style={{ alignItems: 'center', paddingVertical: 40 }}>
					<Image
						source={resources.cardLibrary.cardsImage}
						style={styles.cardsImage}
					/>
					<Text responsiveSizes={[35]} style={styles.title}>
						Card Rarity
					</Text>
					<Text>Collect and complete your Card collection with 5 rarities</Text>
					<UnderRealmButton
						style={styles.headerButton}
						title={'Craft/Combine'}
						disabled
					/>
				</View>
				<ImageBackground
					source={resources.cardLibrary.expandedSearchBarBackground}
					style={[
						styles.searchBarBackground,
						{ height: showSubFilter ? 210 : 130 },
					]}
					resizeMode="stretch"
				>
					<View style={styles.cardTypeButtonContainer}>
						{renderCardTypeSelector()}
						<View style={{ flexDirection: 'row' }}>
							<SearchBar value={search} onChangeText={onSearch} />
							<FilterButton
								isActive={selectedType === ICardType.Hero}
								onPress={() => setShowSubFilter((value) => !value)}
							/>
						</View>
					</View>
					{renderSubFilter()}
				</ImageBackground>
				<View style={styles.content}>
					<Text>{`${cardList.length} cards found for "${
						CardTypeContent[selectedType + 1].displayName
					}"`}</Text>
					<View style={styles.cardListContainer}>
						{cardList.map((card) => {
							return <Card data={card} key={card.id} />;
						})}
					</View>
				</View>
			</ScrollLayout>
		</View>
	);
};

export default Library;

const styles = StyleSheet.create({
	imageBackground: {
		width: '100%',
		aspectRatio: 1382 / 788,
		position: 'absolute',
		top: navigationHeight.storm + navigationHeight.local,
	},
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
	title: {
		fontFamily: 'Volkhov',
		fontWeight: '600',
		color: '#fff',
		textAlign: 'center',
		marginBottom: 8,
	},
	cardsImage: {
		aspectRatio: 496 / 288,
		width: 496,
	},
	headerButton: {
		width: 250,
		alignItems: 'center',
		marginTop: 15,
	},
	searchBarBackground: {
		width: '100%',
		height: 130,
		justifyContent: 'center',
		alignItems: 'center',
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'center',
	},
	filterLabel: {
		fontWeight: '500',
	},
	dropdownContainer: {
		marginRight: 8,
	},
	cardTypeButtonContainer: {
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '75%',
	},
	content: {
		marginTop: 40,
		width: 180 * 8,
		alignSelf: 'center',
	},
	cardListContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
});
