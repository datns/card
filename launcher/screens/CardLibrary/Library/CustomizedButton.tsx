import React, { PropsWithChildren } from 'react';
import {
	Image,
	ImageStyle,
	StyleProp,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable } from '@metacraft/ui';
import { idleLayout } from 'utils/helper';
import resources from 'utils/resources';

interface Props {
	onPress: () => void;
	isActive?: boolean;
	containerStyle?: StyleProp<ViewStyle>;
}
const CustomizedButton: React.FC<PropsWithChildren<Props>> = ({
	onPress,
	containerStyle,
	children,
}) => {
	const [layout, setLayout] = React.useState(idleLayout);
	const animatedOpacity = useSharedValue(0);

	const animatedHoverStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(animatedOpacity.value),
		};
	});

	const onHoverIn = () => (animatedOpacity.value = 1);

	const onHoverOut = () => (animatedOpacity.value = 0);

	const middle = {
		position: 'absolute',
		top: 0,
		left: 5,
		right: 5,
		height: layout.height,
	} as ImageStyle;

	const left = {
		position: 'absolute',
		top: 0,
		height: layout.height,
		aspectRatio: 1,
		left: 0,
	} as ImageStyle;

	const right = {
		position: 'absolute',
		top: 0,
		height: layout.height,
		aspectRatio: 144 / 308,
		right: 0,
		justifyContent: 'center',
		alignItems: 'center',
	} as ImageStyle;

	return (
		<TouchableOpacity
			onPress={onPress}
			style={[styles.container, containerStyle]}
			onLayout={(e) => setLayout(e.nativeEvent.layout)}
		>
			<Hoverable
				onHoverOut={onHoverOut}
				onHoverIn={onHoverIn}
				style={{ position: 'absolute', left: 0, right: 0, height: '100%' }}
			>
				<Animated.View>
					<Image
						source={resources.marketplace.underRealmButton.normal.middle}
						resizeMode={'repeat'}
						style={middle}
					/>
					<Image
						source={resources.marketplace.underRealmButton.normal.left}
						style={left}
					/>
					<Image
						source={resources.cardLibrary.dropdownButtonNormalRightEdge}
						style={right}
					/>
					<Animated.Image
						source={resources.marketplace.underRealmButton.hover.middle}
						resizeMode={'repeat'}
						style={[middle, animatedHoverStyle]}
					/>
					<Animated.Image
						source={resources.marketplace.underRealmButton.hover.left}
						style={[left, animatedHoverStyle]}
					/>
					<Animated.Image
						source={resources.cardLibrary.dropdownButtonHoverRightEdge}
						style={[right, animatedHoverStyle]}
					/>
					<View style={styles.childrenContainer}>{children}</View>
				</Animated.View>
			</Hoverable>
		</TouchableOpacity>
	);
};

export default CustomizedButton;

const styles = StyleSheet.create({
	container: {
		width: 172,
		height: 50,
	},
	childrenContainer: {
		alignItems: 'center',
		justifyContent: 'center',
		flex: 1,
	},
});
