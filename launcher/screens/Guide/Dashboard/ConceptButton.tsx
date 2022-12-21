import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import { sharedStyle, useHoveredStyle } from 'screens/Guide/shared';
import resources from 'utils/resources';

interface Props {
	label: string;
	icon: number;
	isFirst: boolean;
	isLast: boolean;
	onPress?: () => void;
	isSelected: boolean;
	disabled?: boolean;
}

const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

const ConceptButton: FC<Props> = ({
	label,
	icon,
	isFirst,
	isLast,
	onPress,
	isSelected,
}) => {
	const extraStyle = {
		marginLeft: isFirst ? 0 : 20,
		marginRight: isLast ? 0 : 20,
	};

	const animatedContainer = useAnimatedStyle(() => ({
		opacity: withTiming(isSelected ? 1 : 0.5),
	}));

	const animatedImage = useAnimatedStyle(() => {
		return {
			width: 105,
			height: 88,
			position: 'absolute',
			marginLeft: 20,
			opacity: withTiming(isSelected ? 1 : 0, { duration: 400 }),
		};
	});

	const outlineStyle = useAnimatedStyle(() => ({
		borderColor: withTiming(isSelected ? '#786442' : 'transparent'),
	}));

	const indicatorStyle = useAnimatedStyle(() => ({
		backgroundColor: withTiming(isSelected ? '#edede8' : '#423c36'),
	}));

	return (
		<View>
			<AnimatedTouchable
				key={label}
				style={[styles.container, extraStyle, animatedContainer]}
				onPress={onPress}
				disabled={isSelected}
			>
				{isSelected && (
					<Animated.Image
						source={resources.guide.effectOverlay}
						style={animatedImage}
					/>
				)}
				<Hoverable animatedStyle={useHoveredStyle} style={styles.content}>
					<Animated.View>
						<Image source={icon} style={styles.icon} />
						<Text style={[sharedStyle.textShadow, styles.label]}>{label}</Text>
					</Animated.View>
				</Hoverable>
			</AnimatedTouchable>
			<Animated.View
				style={[outlineStyle, styles.indicatorOutline, extraStyle]}
			>
				<Animated.View style={[indicatorStyle, styles.indicator]} />
			</Animated.View>
		</View>
	);
};

export default ConceptButton;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'center',
	},
	content: {
		alignItems: 'center',
	},
	icon: {
		width: 40,
		aspectRatio: 1,
	},
	label: {
		textAlign: 'center',
		color: '#FFFBDF',
	},
	indicatorOutline: {
		width: 12,
		height: 12,
		backgroundColor: 'transparent',
		borderWidth: 1,
		marginTop: 40,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		transform: [
			{
				rotate: '45deg',
			},
		],
	},
	indicator: {
		width: 5,
		height: 5,
		transform: [
			{
				rotate: '90deg',
			},
		],
	},
});
