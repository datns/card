import React from 'react';
import { Image, ImageBackground, StyleSheet, TextInput } from 'react-native';
import resources from 'utils/resources';

interface Props {
	onChangeText: (text: string) => void;
	value: string;
}
const SearchBar: React.FC<Props> = ({ onChangeText, value }) => {
	return (
		<ImageBackground
			source={resources.cardLibrary.searchBackground}
			style={styles.container}
			resizeMode="stretch"
		>
			<TextInput
				onChangeText={onChangeText}
				value={value}
				style={styles.textInput}
				placeholder={'Search'}
				placeholderTextColor="#76645e"
			/>
			<Image source={resources.cardLibrary.searchIcon} style={styles.icon} />
		</ImageBackground>
	);
};

export default SearchBar;

const styles = StyleSheet.create({
	container: {
		height: 50,
		paddingHorizontal: 20,
		width: 250,
		backgroundColor: '#1e0f0d',
		flexDirection: 'row',
		alignItems: 'center',
	},
	textInput: {
		color: '#fff',
		fontFamily: 'Poppins',
		height: '100%',
		flex: 1,
	},
	icon: {
		width: 19,
		height: 19,
	},
});
