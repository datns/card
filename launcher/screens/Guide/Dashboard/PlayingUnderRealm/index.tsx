import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import { play } from 'screens/Guide/content';
import ConceptButton from 'screens/Guide/Dashboard/ConceptButton';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const PlayingUnderRealm: React.FC = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const [selectedConcept, setSelectedConcept] = React.useState<number>(0);
	const imageWidth = responsiveLevel > 1 ? 803 * (1 / responsiveLevel) : 803;
	const imageStyle = {
		width: imageWidth,
		height: (imageWidth * 483) / 803,
		marginTop: 40,
	};
	return (
		<View style={[styles.container, iStyles.wideContainer]}>
			<Text
				responsiveSizes={headingSize}
				style={[sharedStyle.heading, sharedStyle.textShadow]}
			>
				Playing Under Realm
			</Text>
			<Text style={[sharedStyle.subHeading, styles.subHeading]}>
				{play.intro}
			</Text>
			<View style={[styles.conceptContainer, { width: imageWidth }]}>
				{play.concepts.map(({ label, icon }, index) => {
					const handlePress = () => setSelectedConcept(index);
					return (
						<ConceptButton
							onPress={handlePress}
							label={label}
							icon={icon}
							key={label}
							isFirst={index === 0}
							isLast={index === play.concepts.length - 1}
							isSelected={index === selectedConcept}
						/>
					);
				})}
			</View>
			<Text style={{ width: imageWidth, fontFamily: 'Poppins' }}>
				{play.concepts[selectedConcept].content}
			</Text>
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
