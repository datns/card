import React from 'react';
import { Image, ImageBackground, StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import UnderRealmButton from 'components/Marketplace/Button';
import { navigationHeight } from 'components/Navigation/shared';
import Dropdown from 'screens/CardLibrary/Library/Dropdown';
import { Typecard } from 'screens/CardLibrary/Library/mocks';
import SearchBar from 'screens/CardLibrary/Library/SearchBar';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';
import FilterButton from "screens/CardLibrary/Library/CustomizedButton";
import CustomizedButton from "screens/CardLibrary/Library/CustomizedButton";

const Library: React.FC = () => {
	const [selectedClass, setSelectedClass] = React.useState<number>(-1);
	const [search, setSearch] = React.useState<string>('');
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
					/>
				</View>
				<ImageBackground
					source={resources.cardLibrary.searchBarBackground}
					style={styles.searchBarBackground}
				>
					<Dropdown
						data={Typecard}
						onSelect={setSelectedClass}
						selectedIndex={selectedClass}
						placeholder="Typecard"
						containerStyle={{ marginRight: 8 }}
					/>
					<SearchBar value={search} onChangeText={setSearch} />
					<CustomizedButton onPress={() => {}}>
						<Text>Filter</Text>
					</CustomizedButton>
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
		alignItems: 'center',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
