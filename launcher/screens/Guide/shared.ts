import { StyleSheet } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ScaledSizes } from '@metacraft/ui';
import { HoveredStyleFunc } from 'components/Marketplace/Button/shared';

export const headingSize = [35] as ScaledSizes;

export const useHoveredStyle: HoveredStyleFunc = (isHovered) =>
	useAnimatedStyle(() => ({
		opacity: withTiming(isHovered.value ? 0.5 : 1, { duration: 250 }),
	}));

export const sharedStyle = StyleSheet.create({
	heading: {
		fontFamily: 'Volkhov',
		fontWeight: '600',
		color: '#fff',
		marginBottom: 15,
		textAlign: 'center',
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
	textShadow: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		textShadow: '0 0 10px black',
	},
	subContent: {
		maxWidth: 800,
		paddingVertical: 40,
		paddingHorizontal: 15,
		color: '#fff',
	},
});
