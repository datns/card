import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import Animated from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import { sharedStyle, useHoveredStyle } from 'screens/Guide/shared';

interface Props {
	label: string;
	icon: number;
	isFirst: boolean;
	isLast: boolean;
	onPress?: () => void;
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	content: {
		alignItems: 'center',
	},
	icon: {
		width: 40,
		aspectRatio: 1,
	},
});

const ConceptButton: FC<Props> = ({
	label,
	icon,
	isFirst,
	isLast,
	onPress,
}) => {
	const containerStyle = StyleSheet.flatten([
		styles.container,
		{
			marginLeft: isFirst ? 0 : 20,
			marginRight: isLast ? 0 : 20,
		},
	]);

	return (
		<TouchableOpacity key={label} style={containerStyle} onPress={onPress}>
			<Hoverable animatedStyle={useHoveredStyle} style={styles.content}>
				<Animated.View>
					<Image source={icon} style={styles.icon} />
					<Text style={sharedStyle.textShadow}>{label}</Text>
				</Animated.View>
			</Hoverable>
		</TouchableOpacity>
	);
};

export default ConceptButton;
