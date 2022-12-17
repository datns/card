import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
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
}

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
		fontFamily: 'Poppins',
		textAlign: 'center',
		color: '#FFFBDF',
	},
});

const ConceptButton: FC<Props> = ({
	label,
	icon,
	isFirst,
	isLast,
	onPress,
	isSelected,
}) => {
	const containerStyle = StyleSheet.flatten([
		styles.container,
		{
			marginLeft: isFirst ? 0 : 20,
			marginRight: isLast ? 0 : 20,
		},
	]);

	const animatedImage = useAnimatedStyle(() => {
		return {
			width: 105,
			height: 88,
			position: 'absolute',
			marginLeft: 20,
			opacity: withTiming(isSelected ? 1 : 0, { duration: 400 }),
		};
	});

	return (
		<TouchableOpacity key={label} style={containerStyle} onPress={onPress}>
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
		</TouchableOpacity>
	);
};

export default ConceptButton;
