import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import { sharedStyle } from 'screens/Story/shared';
import Timeline from 'screens/Story/Timeline';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const backgroundRatio = 1007 / 1728;
const Header: React.FC = () => {
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);

	const width = Math.max(1728, windowSize.width);

	const headingBackgroundStyle = {
		width,
		height: width * backgroundRatio,
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
					style={styles.imageFlag}
					resizeMode="contain"
				/>
				<View style={{ alignItems: 'center' }}>
					<Text
						style={[sharedStyle.heading, { color: 'black' }]}
						responsiveSizes={[35]}
					>
						Under Realm Rise of Magic
					</Text>
					<Text style={styles.description} responsiveSizes={[20]}>
						Under Realm: Rise of Magic takes place in a chaotic, fragmented
						world of ATEM where human and other races are constantly fighting
						each other, to wrench the endless thrist for power, wealth, and
						gradually take control over ATEM.
					</Text>
					<Timeline />
				</View>
			</View>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		paddingTop: '10%',
	},
	imageBackground: {
		position: 'absolute',
		top: 0,
		alignSelf: 'center',
	},
	imageFlag: {
		width: 300,
		aspectRatio: 224 / 161,
		marginBottom: 40,
	},
	description: {
		color: 'black',
		textAlign: 'center',
		maxWidth: '45%',
		marginTop: 15,
	},
});
