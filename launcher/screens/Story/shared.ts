import { StyleSheet } from 'react-native';
import { useAnimatedStyle, withTiming } from 'react-native-reanimated';
import { ScaledSizes } from '@metacraft/ui';
import { HoveredStyleFunc } from 'components/Marketplace/Button/shared';
import { iStyles } from 'utils/styles';

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
		textAlign: 'center',
	},
	subHeading: {
		maxWidth: 1100,
		paddingVertical: 40,
		color: '#fff',
	},
	textShadow: {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		textShadow: '0 0 10px #FFFBDF',
	},
	subContent: {
		maxWidth: 850,
		textAlign: 'center',
		alignSelf: 'center',
		color: '#fff',
	},
});
