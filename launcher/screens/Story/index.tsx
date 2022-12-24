import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import Banner from 'screens/Story/Banner';
import Header from 'screens/Story/Header';
import { sharedStyle } from 'screens/Story/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const Story: React.FC = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);

	const viewWidth = responsiveLevel > 1 ? '100%' : '60%';

	return (
		<View style={[iStyles.wideContainer, { flex: 1 }]}>
			<ScrollView contentContainerStyle={styles.container}>
				<Image
					source={resources.story.mainBackground}
					style={styles.imageBackground}
				/>
				<Header />
				<View style={[styles.contentContainer, { width: viewWidth }]}>
					<Image
						source={resources.story.atemWorldMap}
						style={styles.worldMap}
						resizeMode="contain"
					/>
					<Text
						style={[
							{ marginBottom: 60, paddingHorizontal: 15 },
							sharedStyle.subContent,
						]}
					>
						There are many variations of passages of Lorem Ipsum available, but
						the majority have suffered alteration in some form, by injected
						humour, or randomised words which don't look even slightly
						believable. If you are going to use a passage of Lorem Ipsum, you
						need to be sure there isn't anything embarrassing hidden in the
						middle of text. All the Lorem Ipsum generators on the Internet tend
						to repeat predefined chunks as necessary, making this the first true
						generator on the Internet. It uses a dictionary of over 200 Latin
						words, combined with a handful of model sentence structures, to
						generate Lorem Ipsum which looks reasonable. The generated Lorem
						Ipsum is therefore always free from repetition, injected humour, or
						non-characteristic words etc.
					</Text>
					<Banner />
				</View>
			</ScrollView>
		</View>
	);
};

export default Story;

const styles = StyleSheet.create({
	container: {
		// flex: 1,
		backgroundColor: '#000',
		paddingBottom: 80,
	},
	contentContainer: {
		width: '60%',
		alignSelf: 'center',
	},
	imageBackground: {
		width: '100%',
		position: 'absolute',
		top: 0,
		aspectRatio: 1728 / 3516,
	},
	worldMap: {
		aspectRatio: 897 / 673,
		width: '80%',
		alignSelf: 'center',
		marginBottom: 60,
		marginTop: 20,
	},
});
