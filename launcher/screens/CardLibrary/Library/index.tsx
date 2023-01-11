import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { makeMeta } from '@metacraft/murg-engine';
import { Text } from '@metacraft/ui';
import Card from 'components/Card';
import ScrollLayout from 'components/layouts/Scroll';
import UnderRealmButton from 'components/Marketplace/Button';
import { navigationHeight } from 'components/Navigation/shared';
import CustomizedButton from 'screens/CardLibrary/Library/CustomizedButton';
import Dropdown from 'screens/CardLibrary/Library/Dropdown';
import {
	CardType,
	Classes,
	Elemental,
} from 'screens/CardLibrary/Library/mocks';
import SearchBar from 'screens/CardLibrary/Library/SearchBar';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const Library: React.FC = () => {
	const [selectedType, setSelectedType] = React.useState<number>(0);
	const [search, setSearch] = React.useState<string>('');
	const [showFilter, setShowFilter] = React.useState<boolean>(false);
	const { version, entities, map } = makeMeta('00001');

	const card1: {
		attribute: { attack: number; defense: number; health: number };
		name: string;
		rarity: number;
		elemental: string;
		class: string;
		id: string;
	} = map['000010001'];

	console.log({
		version,
		entities,
		map,
	});
	const renderAdditionalFilter = () => {
		if (!showFilter) return null;
		return (
			<>
				<View
					style={{
						width: '70%',
						height: 1,
						backgroundColor: '#644d3d',
						marginVertical: 20,
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
						data={CardType}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="Attack"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={CardType}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="Defense"
						containerStyle={styles.dropdownContainer}
					/>
					<Dropdown
						data={CardType}
						onSelect={() => {}}
						selectedIndex={0}
						placeholder="HP"
						containerStyle={styles.dropdownContainer}
					/>
				</View>
			</>
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
					<Card
						attribute={card1.attribute}
						elemental={card1.elemental}
						class={card1.class}
						rarity={5}
						name={card1.name}
						id={card1.id}
					/>
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
					/>
				</View>
				<ImageBackground
					source={resources.cardLibrary.expandedSearchBarBackground}
					style={[
						styles.searchBarBackground,
						{ height: showFilter ? 210 : 130 },
					]}
					resizeMode="stretch"
				>
					<View
						style={{
							alignItems: 'center',
							flexDirection: 'row',
							justifyContent: 'center',
						}}
					>
						<Dropdown
							data={CardType}
							onSelect={setSelectedType}
							selectedIndex={selectedType}
							placeholder="Card Type"
							containerStyle={styles.dropdownContainer}
						/>
						<SearchBar value={search} onChangeText={setSearch} />
						{selectedType === 1 && (
							<CustomizedButton
								onPress={() => setShowFilter((val) => !val)}
								containerStyle={{ marginLeft: 8 }}
							>
								<View style={styles.filterContainer}>
									<Image
										source={resources.cardLibrary.activeFilterIcon}
										style={{ width: 14, aspectRatio: 1, marginRight: 8 }}
										resizeMode="contain"
									/>
									<Text style={styles.filterLabel}>Filter</Text>
								</View>
							</CustomizedButton>
						)}
					</View>
					{renderAdditionalFilter()}
				</ImageBackground>
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
});
