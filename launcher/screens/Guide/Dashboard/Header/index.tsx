import React, { FC, useEffect, useState } from 'react';
import {
	Dimensions,
	Image,
	ImageBackground,
	StyleSheet,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import { headingSize, sharedStyle } from 'screens/Guide/shared';

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
			<ImageBackground
				source={resources.guide.headingBackground}
				resizeMode="cover"
				style={[styles.headingBackground, headingBackgroundStyle]}
			>
				<View style={styles.container}>
					<Text
						style={[sharedStyle.heading, sharedStyle.textShadow]}
						responsiveSizes={headingSize}
					>
						{labels.heading}
					</Text>
					<Text style={[sharedStyle.subHeading, styles.subHeading]}>
						{labels.subHeading}
					</Text>
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
			</ImageBackground>
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
		// position: 'absolute',
	},
	subHeading: {
		textAlign: 'center',
	},
	icons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		minWidth: 380,
	},
});

export default Header;
