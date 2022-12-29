import React from 'react';
import {
	ScrollView,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import { battlefield } from 'screens/Guide/content';
import ConceptButton from 'screens/Guide/Dashboard/ConceptButton';
import { ContentType } from 'screens/Guide/shared';

interface Props {
	content: ContentType;
	containerStyle?: StyleProp<ViewStyle>;
	renderDescription?: (
		des: string,
		additional?: { title: string; text: string }[],
	) => React.ReactNode;
	renderImage?: (source: number) => React.ReactNode;
}
const Concept: React.FC<Props> = ({
	content,
	containerStyle,
	renderDescription,
	renderImage,
}) => {
	const [selectedConcept, setSelectedConcept] = React.useState<number>(0);
	const imageSource = content.concepts[selectedConcept]?.image;

	return (
		<View style={{ width: '100%' }}>
			<View style={styles.indicatorLine} />
			<ScrollView
				horizontal
				contentContainerStyle={[
					styles.conceptContainer,
					{
						width: '100%',
					},
					containerStyle,
				]}
				showsHorizontalScrollIndicator={false}
			>
				{content.concepts.map(({ label, icon }, index) => {
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
			<View style={styles.descriptionContainer} key={selectedConcept}>
				{renderDescription &&
					renderDescription(
						content.concepts[selectedConcept].description,
						content.concepts[selectedConcept].additional,
					)}
			</View>
			{renderImage && !!imageSource && renderImage(imageSource)}
		</View>
	);
};

export default Concept;

const styles = StyleSheet.create({
	conceptContainer: {
		paddingTop: 40,
		paddingHorizontal: 20,
		paddingBottom: 40,
	},
	indicatorLine: {
		width: '100%',
		height: 1,
		backgroundColor: '#423c36',
		position: 'absolute',
		top: 126.5,
	},
	descriptionContainer: {
		paddingHorizontal: 40,
	},
});
