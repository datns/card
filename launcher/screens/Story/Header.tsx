import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';
import {sharedStyle} from "screens/Story/shared";

const headingBackgroundRatio = 1007 / 1728;
const Header: React.FC = () => {
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);

	const width = Math.min(windowSize.width, iStyles.wideContainer.maxWidth);

	const headingBackgroundStyle = {
		width,
		height: width * headingBackgroundRatio,
	};

	return (
		<View style={{ height: headingBackgroundStyle.height }}>
			<Image
				source={resources.story.headerBackground}
				resizeMode="contain"
				style={[styles.imageBackground, headingBackgroundStyle]}
			/>
			<View style={styles.container}>
				<Image
					source={resources.story.headerFlag}
					style={{
						width: '20%',
						aspectRatio: 224 / 161,
						marginBottom: 40,
					}}
					resizeMode="contain"
				/>
				<Text
					style={[sharedStyle.heading, { color: 'black' }]}
					responsiveSizes={[35]}
				>
					Under Realm Rise of Magic
				</Text>
				<Text
					style={{
						color: 'black',
						textAlign: 'center',
						maxWidth: '30%',
						marginTop: 15,
					}}
				>
					Under Realm: Rise of Magic takes place in a chaotic, fragmented world
					of ATEM where human and other races are constantly fighting each
					other, to wrench the endless thrist for power, wealth, and gradually
					take control over ATEM.
				</Text>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: 160,
	},
	imageBackground: {
		width: '100%',
		position: 'absolute',
		top: 0,
	},
});
