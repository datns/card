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
	renderDescription?: (des: string) => React.ReactNode;
}
const Concept: React.FC<Props> = ({
	content,
	containerStyle,
	renderDescription,
}) => {
	const [selectedConcept, setSelectedConcept] = React.useState<number>(0);

	return (
		<View style={containerStyle}>
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
			{renderDescription &&
				renderDescription(content.concepts[selectedConcept].content)}
		</View>
	);
};

export default Concept;

const styles = StyleSheet.create({
	conceptContainer: {
		justifyContent: 'space-between',
		paddingTop: 40,
		paddingHorizontal: 20,
		paddingBottom: 20,
	},
	indicatorLine: {
		width: '100%',
		height: 1,
		backgroundColor: '#423c36',
		position: 'absolute',
		top: 146.5,
	},
});
