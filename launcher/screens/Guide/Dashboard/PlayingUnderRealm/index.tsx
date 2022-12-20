import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import { play } from 'screens/Guide/content';
import Concept from 'screens/Guide/Dashboard/Concept';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const PlayingUnderRealm: React.FC = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const imageWidth = responsiveLevel > 1 ? 803 * (1 / responsiveLevel) : 803;
	const imageStyle = {
		width: imageWidth,
		height: (imageWidth * 483) / 803,
		marginTop: 40,
	};

	const renderDescription = (des: string) => {
		return <Text style={{ width: imageWidth }}>{des}</Text>;
	};
	return (
		<View style={sharedStyle.sectionContainer}>
			<Text
				responsiveSizes={headingSize}
				style={[sharedStyle.heading, sharedStyle.textShadow]}
			>
				Playing Under Realm
			</Text>
			<Text style={[sharedStyle.subHeading, styles.subHeading]}>
				{play.intro}
			</Text>
			<Concept
				content={play}
				containerStyle={{
					justifyContent: 'flex-start',
					width: imageWidth + 40,
				}}
				renderDescription={renderDescription}
			/>
			<Image source={resources.guide.battlefieldImage} style={imageStyle} />
		</View>
	);
};

export default PlayingUnderRealm;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	subHeading: {
		textAlign: 'center',
	},
	conceptContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		marginBottom: 40,
	},
});
