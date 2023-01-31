import React from 'react';
import {
	Image,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Text } from '@metacraft/ui';
import resources from 'utils/resources';

interface Props {
	isActive: boolean;
	onPress: () => void;
}

const AnimatedImageBackground =
	Animated.createAnimatedComponent(ImageBackground);

const FilterButton: React.FC<Props> = ({ isActive, onPress }) => {
	const animatedBgStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isActive ? 1 : 0.5),
		};
	});

	const bgSource = isActive
		? resources.cardLibrary.activeFilterButton
		: resources.cardLibrary.normalFilterButton;

	const iconSource = isActive
		? resources.cardLibrary.activeFilterIcon
		: resources.cardLibrary.normalFilterIcon;

	return (
		<TouchableOpacity onPress={onPress} disabled={!isActive}>
			<AnimatedImageBackground
				style={[styles.container, animatedBgStyle]}
				resizeMode="stretch"
				source={bgSource}
			>
				<Image style={styles.icon} source={iconSource} />
				<Text
					style={{ ...styles.label, color: !isActive ? '#6d645f' : '#d4bc78' }}
				>
					Filters
				</Text>
			</AnimatedImageBackground>
		</TouchableOpacity>
	);
};

export default FilterButton;

const styles = StyleSheet.create({
	container: {
		width: 172,
		height: 55,
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	icon: {
		width: 14,
		height: 14,
		marginRight: 8,
	},
	label: {
		fontWeight: '500',
	},
});
