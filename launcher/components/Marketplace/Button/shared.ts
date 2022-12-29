import { ViewStyle } from 'react-native';
import {
	AnimatedStyleProp,
	SharedValue,
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

export type HoveredStyleFunc = (
	isHoverd: SharedValue<boolean>,
) => AnimatedStyleProp<ViewStyle>;

export const useDefaultHoveredStyle: HoveredStyleFunc = (isHovered) =>
	useAnimatedStyle(() => ({
		opacity: withTiming(isHovered.value ? 1 : 0, { duration: 250 }),
	}));
