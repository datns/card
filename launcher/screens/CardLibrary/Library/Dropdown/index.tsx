import React from 'react';
import {
	Image,
	ImageStyle,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import { Text } from '@metacraft/ui';
import CustomizedButton from 'screens/CardLibrary/Library/CustomizedButton';
import { idleLayout } from 'utils/helper';
import resources from 'utils/resources';

import DropdownItem from './DropdownItem';

interface Props {
	data: Array<{ label: string; value: string }>;
	onSelect: (index: number) => void;
	selectedIndex: number;
	placeholder: string;
	containerStyle?: StyleProp<ViewStyle>;
}

const Dropdown: React.FC<Props> = ({
	data,
	onSelect,
	selectedIndex,
	placeholder,
	containerStyle,
}) => {
	const [layout, setLayout] = React.useState(idleLayout);
	const [dropdownButtonHeight, setDropdownButtonHeight] =
		React.useState<number>(0);
	const [visible, setVisible] = React.useState<boolean>(false);
	const [dropdownHeight, setDropdownHeight] = React.useState<number>(0);
	const ref = React.useRef<View>(null);

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
		<View
			style={containerStyle}
			onLayout={(e) => setLayout(e.nativeEvent.layout)}
			ref={ref}
		>
			<CustomizedButton
				onPress={toggleDropdown}
				containerStyle={styles.container}
			>
				<Image source={resources.cardLibrary.arrow} style={styles.arrow} />
				<Text style={styles.labelButton} responsiveSizes={[12]}>
					{selectedIndex > 0 ? data[selectedIndex].label : placeholder}
				</Text>
			</CustomizedButton>
			{visible && renderDropDown()}
		</View>
	);
};

export default Dropdown;

const styles = StyleSheet.create({
	container: {
		paddingVertical: 12,
		paddingHorizontal: 10,
		justifyContent: 'center',
	},
	labelButton: {
		textAlign: 'center',
		color: '#fff',
		fontWeight: '600',
	},
	arrow: {
		width: 10,
		height: 6,
		position: 'absolute',
		right: 20,
	},
	dropdownContainer: {
		position: 'absolute',
		backgroundColor: '#0c0907',
		paddingHorizontal: 15,
		paddingVertical: 8,
		borderColor: '#644d3d',
		borderWidth: 3,
		zIndex: 999,
	},
});
