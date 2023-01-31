import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';
import { Text } from '@metacraft/ui';
import { CardTypeProps } from 'screens/CardLibrary/Library/shared';
import resources from 'utils/resources';

interface Props {
	isSelected: boolean;
	type: CardTypeProps;
	onPress: () => void;
}
const CardTypeButton: React.FC<Props> = ({
	isSelected,
	onPress,
											 type
}) => {
	const animatedEffectStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(isSelected ? 1 : 0),
		};
	});

	return (
		<TouchableOpacity style={styles.container} onPress={onPress}>
			<View>
				<Animated.Image
					source={resources.cardLibrary.effectSelectType}
					style={[animatedEffectStyle, styles.effect]}
				/>

				<Image source={type.image} style={styles.image} resizeMode="contain" />
			</View>

			<Text style={isSelected ? styles.focusLabel : styles.label}>{type.label}</Text>
		</TouchableOpacity>
	);
};

export default CardTypeButton;

const styles = StyleSheet.create({
	container: {
		marginHorizontal: 20,
		alignItems: 'center',
	},
	effect: {
		position: 'absolute',
		width: 100,
		aspectRatio: 106 / 94,
		top: -10,
		left: -20,
	},
	image: {
		width: 66,
		height: 66,
	},
	focusLabel: {
		textShadow: '0 0 10px #8D8767',
		color: '#fff',
	},
	label: {
		color: '#fff',
	},
});
