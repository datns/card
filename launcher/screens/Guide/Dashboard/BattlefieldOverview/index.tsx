import React from 'react';
import { Image, ScrollView, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import { battlefield } from 'screens/Guide/content';
import ConceptButton from 'screens/Guide/Dashboard/ConceptButton';
import { sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const BattlefieldOverview: React.FC = () => {
	const [selectedConcept, setSelectedConcept] = React.useState<number>(0);
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const imageWidth = responsiveLevel > 1 ? 803 * (1 / responsiveLevel) : 803;
	const imageSize = {
		width: imageWidth,
		height: (imageWidth * 483) / 803,
		marginBottom: 20,
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
				<ScrollView
					horizontal
					contentContainerStyle={[
						styles.conceptContainer,
						{
							width: '100%',
						},
					]}
					showsHorizontalScrollIndicator={false}
				>
					{battlefield.concepts.map(({ label, icon }, index) => {
						return (
							<ConceptButton
								label={label}
								icon={icon}
								key={label}
								isFirst={index === 0}
								isLast={index === battlefield.concepts.length - 1}
								onPress={() => setSelectedConcept(index)}
								isSelected={index === selectedConcept}
							/>
						);
					})}
				</ScrollView>
				<Text style={[sharedStyle.subHeading, styles.conceptContent]}>
					{battlefield.concepts[selectedConcept].content}
				</Text>
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
	},
	conceptContent: {
		paddingHorizontal: 20,
	},
	imageWrapper: {
		alignSelf: 'center',
	},
});
