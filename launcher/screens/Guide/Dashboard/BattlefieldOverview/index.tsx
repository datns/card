import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import { battlefield } from 'screens/Guide/content';
import Concept from 'screens/Guide/Dashboard/Concept';
import { sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const BattlefieldOverview: React.FC = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const imageWidth = responsiveLevel > 1 ? 803 * (1 / responsiveLevel) : 803;
	const imageSize = {
		width: imageWidth,
		height: (imageWidth * 483) / 803,
		marginBottom: 20,
	};

	const renderDescription = (des: string) => {
		return (
			<Text style={[sharedStyle.subHeading, styles.conceptContent]}>{des}</Text>
		);
	};

	return (
		<View style={sharedStyle.sectionContainer}>
			<Text
				responsiveSizes={[35]}
				style={[sharedStyle.heading, sharedStyle.textShadow]}
			>
				Battlefield Overview
			</Text>
			<View style={{ width: imageWidth + 40 }}>
				<Concept
					content={battlefield}
					renderDescription={renderDescription}
				/>
				<View style={styles.imageWrapper}>
					<Image source={resources.guide.battlefieldImage} style={imageSize} />
				</View>
			</View>
			<View />
		</View>
	);
};

export default BattlefieldOverview;

const styles = StyleSheet.create({
	conceptContainer: {
		justifyContent: 'space-between',
		paddingTop: 40,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	conceptContent: {
		paddingHorizontal: 20,
		paddingTop: 0,
	},
	imageWrapper: {
		alignSelf: 'center',
	},
});
