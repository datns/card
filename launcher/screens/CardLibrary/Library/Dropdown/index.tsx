import React from 'react';
import {
	Image,
	ImageStyle,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming,
} from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import { idleLayout } from 'utils/helper';
import resources from 'utils/resources';

import DropdownItem from './DropdownItem';

interface Props {
	data: Array<{ label: string; value: string }>;
	onSelect: (index: number) => void;
	selectedIndex: number;
	placeholder: string;
}

const Dropdown: React.FC<Props> = ({
	data,
	onSelect,
	selectedIndex,
	placeholder,
}) => {
	const [layout, setLayout] = React.useState(idleLayout);
	const [dropdownButtonHeight, setDropdownButtonHeight] =
		React.useState<number>(0);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [dropdownHeight, setDropdownHeight] = React.useState<number>(0);
	const ref = React.useRef<TouchableOpacity>(null);
	const animatedOpacity = useSharedValue(0);

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

	const leftSide = {
		width: 3,
		top: -3,
		height: dropdownHeight,
		position: 'absolute',
		left: -3,
		transform: [{ rotateY: '180deg' }],
	} as ImageStyle;

	const rightSide = {
		width: 4,
		top: -3,
		height: dropdownHeight,
		position: 'absolute',
		right: -3,
	} as ImageStyle;

	const animatedHoverStyle = useAnimatedStyle(() => {
		return {
			opacity: withTiming(animatedOpacity.value),
		};
	});

	const onHoverIn = () => (animatedOpacity.value = 1);

	const onHoverOut = () => (animatedOpacity.value = 0);

	const showDropdown = () => {
		ref?.current?.measure((_fx, _fy, _w, h, _px, py) => {
			console.log({
				h,
				py,
			});
			setDropdownButtonHeight(h);
		});
		setVisible(true);
	};

	const toggleDropdown = (): void => {
		visible ? setVisible(false) : showDropdown();
	};

	const renderDropDown = () => {
		return (
			<View
				style={{
					...styles.dropdownContainer,
					top: dropdownButtonHeight + 8,
					width: layout.width - 2,
					left: 3,
				}}
				onLayout={(e) => setDropdownHeight(e.nativeEvent.layout.height)}
			>
				<Image
					source={resources.cardLibrary.dropdownSide}
					style={leftSide}
					resizeMode="stretch"
				/>
				<Image
					source={resources.cardLibrary.dropdownSide}
					style={rightSide}
					resizeMode="stretch"
				/>
				{data.map((value, index) => {
					const onPressItem = () => {
						onSelect(index);
						setVisible(false);
					};

					return (
						<DropdownItem
							key={value.value}
							onPress={onPressItem}
							label={value.label}
						/>
					);
				})}
			</View>
		);
	};

	return (
		<View>
			<TouchableOpacity
				ref={ref}
				onPress={toggleDropdown}
				style={styles.container}
				onLayout={(e) => setLayout(e.nativeEvent.layout)}
			>
				<Hoverable
					style={{ ...middle, left: 0, right: 0, justifyContent: 'center' }}
					onHoverIn={onHoverIn}
					onHoverOut={onHoverOut}
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
						<View style={right}>
							<Image
								source={resources.cardLibrary.arrow}
								style={styles.arrow}
							/>
						</View>
						<View>
							<Text style={styles.labelButton}>
								{selectedIndex > -1 ? data[selectedIndex].label : placeholder}
							</Text>
						</View>
					</Animated.View>
				</Hoverable>
			</TouchableOpacity>
			{visible && renderDropDown()}
		</View>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		paddingHorizontal: 10,
		width: 220,
		height: 50,
		justifyContent: 'center',
	},
	labelButton: {
		textAlign: 'center',
		color: '#fff',
	},
	arrow: {
		position: 'absolute',
		width: 10,
		height: 6,
	},
	dropdownContainer: {
		position: 'absolute',
		backgroundColor: '#0c0907',
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderColor: '#644d3d',
		borderWidth: 3,
	},
});
