import React, { FC, useEffect, useState } from 'react';
import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';

import resources from '../../../../utils/resources';

import Icon from './Icon';

const labels = {
	heading: 'How To Play',
	subHeading:
		'Under Realm is a strategy card game that focus heavily on grand strategy so understanding the Game rules carefully can help you the 1st understanding on how to setup our Battlefield',
};

const headingBackgroundRatio = 404 / 1296;

export enum ViewType {
	Battlefield,
	Play,
	Card,
}

const Header: FC = () => {
	const window = Dimensions.get('window');

	const [dimensions, setDimensions] = useState({ window });
	const [activeIconIndex, setActiveIconIndex] = useState(0);

	useEffect(() => {
		const subscription = Dimensions.addEventListener('change', ({ window }) => {
			setDimensions({ window });
		});
		return () => subscription?.remove();
	});

	const headingBackgroundStyle = {
		height: dimensions.window.width * headingBackgroundRatio,
	};

	const onIconPress = (index: number) => setActiveIconIndex(index);

	return (
		<View style={{ alignItems: 'center', justifyContent: 'center' }}>
			<Image
				source={resources.guide.headingBackground}
				resizeMode="cover"
				style={[styles.headingBackground, headingBackgroundStyle]}
			/>
			<View style={styles.container}>
				<Text style={styles.heading}>{labels.heading}</Text>
				<Text style={styles.subHeading}>{labels.subHeading}</Text>
				<View style={styles.icons}>
					<Icon
						type={ViewType.Battlefield}
						onPress={() => onIconPress(0)}
						isActive={activeIconIndex === 0}
					/>
					<Icon
						type={ViewType.Play}
						onPress={() => onIconPress(1)}
						isActive={activeIconIndex === 1}
					/>
					<Icon
						type={ViewType.Card}
						onPress={() => onIconPress(2)}
						isActive={activeIconIndex === 2}
					/>
				</View>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 24,
		paddingVertical: 40,
		alignItems: 'center',
		justifyContent: 'center',
	},
	headingBackground: {
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-around',
		position: 'absolute',
	},
	heading: {
		fontSize: 24,
		fontWeight: 'bold',
		color: '#fff',
		fontFamily: 'Volkhov',
	},
	subHeading: {
		fontSize: 10,
		color: '#EBEBEB',
		textAlign: 'center',
		maxWidth: 600,
		marginHorizontal: 24,
		marginTop: 18,
	},
	icons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: 250,
		marginTop: 24,
	},
});

export default Header;
