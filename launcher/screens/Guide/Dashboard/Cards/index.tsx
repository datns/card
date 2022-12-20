import React from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import { card } from 'screens/Guide/content';
import Concept from 'screens/Guide/Dashboard/Concept';
import { headingSize, sharedStyle } from 'screens/Guide/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

const Cards: React.FC<Record<string, unknown>> = () => {
	const { responsiveLevel } = useSnapshot<DimensionState>(dimensionState);
	const imageWidth = responsiveLevel > 1 ? 1060 * (1 / responsiveLevel) : 803;
	const imageStyle = {
		width: imageWidth,
		height: (imageWidth * 756) / 1060,
		marginVertical: 40,
	};

	const renderDescription = (
		des: string,
		additional?: { title: string; text: string }[],
	) => {
		return (
			<>
				<Text style={styles.cardInfo}>{des}</Text>
				{additional?.map((item) => {
					return (
						<React.Fragment key={item.title}>
							<Text style={styles.propertyTitle}>{item.title}</Text>
							<Text style={styles.propertyContent}>{item.text}</Text>
						</React.Fragment>
					);
				})}
			</>
		);
	};
	return (
		<View
			style={[
				sharedStyle.sectionContainer,
				styles.container,
				{ width: imageWidth },
			]}
		>
			<Text responsiveSizes={headingSize} style={sharedStyle.heading}>
				Cards
			</Text>
			<Text style={styles.subHeading}>Getting to know your Card</Text>
			<Text style={styles.content}>
				This quick read will teach you how to distinguish between the many types
				and classes of cards that are available in Under Realm: Rise of Magic,
				identify their characteristics, and maybe provide you with some advice
				and ideas on the kinds of strategy you can build.
			</Text>
			<Image source={resources.guide.cardExplain} style={imageStyle} />
			<Concept
				content={card}
				containerStyle={{
					justifyContent: 'flex-start',
					width: imageWidth + 40,
				}}
				renderDescription={renderDescription}
			/>
		</View>
	);
};

export default Cards;

const styles = StyleSheet.create({
	container: {
		paddingTop: 50,
		paddingBottom: 150,
	},
	subHeading: {
		fontFamily: 'Poppins',
		fontSize: 30,
		textAlign: 'center',
		marginTop: 15,
		marginBottom: 8,
	},
	content: {
		fontFamily: 'Poppins',
		textAlign: 'center',
	},
	conceptContainer: {
		flexDirection: 'row',
		flexWrap: 'wrap',
	},
	cardInfo: {
		width: '100%',
		paddingHorizontal: 20,
	},
	propertyTitle: {
		fontFamily: 'Poppins',
		fontSize: 30,
		marginTop: 40,
		marginBottom: 8,
		color: '#67564C',
		alignSelf: 'flex-start',
	},
	propertyContent: {
		fontFamily: 'Poppins',
	},
});
