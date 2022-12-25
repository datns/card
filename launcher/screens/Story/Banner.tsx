import React from 'react';
import {
	Image,
	ScrollView,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import { banner } from 'screens/Story/content';

import { sharedStyle, useHoveredStyle } from './shared';

interface ButtonBannerProps {
	isActive: boolean;
	onPress: () => void;
	label: string;
	activeIcon: number;
	icon: number;
}
const ButtonBanner: React.FC<ButtonBannerProps> = ({
	isActive,
	onPress,
	label,
	activeIcon,
	icon,
}) => {
	const outlineStyle = useAnimatedStyle(() => ({
		borderColor: withTiming(isActive ? '#786442' : 'transparent'),
	}));

	const indicatorStyle = useAnimatedStyle(() => ({
		backgroundColor: withTiming(isActive ? '#edede8' : '#423c36'),
	}));

	return (
		<View>
			<TouchableOpacity
				style={styles.button}
				onPress={onPress}
				disabled={isActive}
			>
				<Hoverable animatedStyle={useHoveredStyle}>
					<Animated.View>
						<Image
							source={isActive ? activeIcon : icon}
							style={styles.buttonIcon}
							resizeMode="contain"
						/>
						<Text
							style={[
								{
									opacity: isActive ? 1 : 0.5,
								},
								styles.buttonText,
								sharedStyle.textShadow,
							]}
						>
							{label}
						</Text>
					</Animated.View>
				</Hoverable>
			</TouchableOpacity>
			<Animated.View style={[styles.indicatorOutline, outlineStyle]}>
				<Animated.View style={[styles.indicator, indicatorStyle]} />
			</Animated.View>
		</View>
	);
};

const Banner: React.FC = () => {
	const [selectedBanner, setSelectedBanner] = React.useState<number>(0);

	const renderButtonList = () => {
		return (
			<>
				<ScrollView horizontal showsHorizontalScrollIndicator={false}>
					{banner.map((item, index) => {
						const onPress = () => {
							setSelectedBanner(index);
						};

						const isActive = index === selectedBanner;

						return (
							<ButtonBanner
								key={item.label}
								isActive={isActive}
								onPress={onPress}
								label={item.label}
								activeIcon={item.activeIcon}
								icon={item.icon}
							/>
						);
					})}
				</ScrollView>
			</>
		);
	};

	return (
		<View style={{ marginHorizontal: 15 }}>
			<View style={styles.indicatorLine} />
			{renderButtonList()}
			<View style={styles.contentContainer}>
				<Image
					source={banner[selectedBanner].image}
					style={styles.bannerImage}
					resizeMode="contain"
				/>
				<Text
					responsiveSizes={[35]}
					style={[sharedStyle.heading, styles.bannerTitle]}
				>
					{banner[selectedBanner].title}
				</Text>
				<Text style={sharedStyle.subContent}>
					{banner[selectedBanner].description}
				</Text>
			</View>
		</View>
	);
};

export default Banner;

const styles = StyleSheet.create({
	contentContainer: {
		borderWidth: 1,
		borderColor: '#423c36',
		borderTopWidth: 0,
		marginTop: -8.5,
		alignItems: 'center',
		alignSelf: 'center',
		padding: '8%',
	},
	button: {
		marginHorizontal: 40,
		alignItems: 'center',
		overflow: 'visible',
	},
	buttonIcon: {
		width: 52,
		aspectRatio: 1,
		alignSelf: 'center',
	},
	buttonText: {
		textAlign: 'center',
		color: '#FFFBDF',
	},
	indicatorLine: {
		width: '100%',
		backgroundColor: '#423c36',
		height: 1,
		position: 'absolute',
		top: 96.5,
	},
	indicatorOutline: {
		width: 12,
		height: 12,
		backgroundColor: 'transparent',
		borderWidth: 1,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginTop: 18,
		marginVertical: 2,
		transform: [
			{
				rotate: '45deg',
			},
		],
		zIndex: 100,
	},
	indicator: {
		width: 6,
		height: 6,
		transform: [
			{
				rotate: '90deg',
			},
		],
		backgroundColor: '#423c36',
		alignSelf: 'center',
		zIndex: 100,
	},
	bannerImage: {
		width: '70%',
		aspectRatio: 503 / 712,
		marginBottom: 60,
	},
	bannerTitle: {
		marginBottom: 20,
	},
});
