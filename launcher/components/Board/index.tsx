import React, { FC, ReactNode } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';

interface Props {
	style?: ViewStyle;
	children: ReactNode;
}

export const UnderRealmBoard: FC<Props> = ({ style, children }) => {
	return (
		<View style={[styles.container, style]}>
			<View style={styles.overlay} />
			<View style={styles.contentContainer}>{children}</View>
		</View>
	);
};

export default UnderRealmBoard;

const styles = StyleSheet.create({
	container: {
		borderColor: '#9f835f',
		borderWidth: 1,
	},
	overlay: {
		position: 'absolute',
		top: 0,
		left: 0,
		bottom: 0,
		right: 0,
		backgroundColor: '#180d05',
		opacity: 0.5,
	},
	contentContainer: {
		width: '100%',
	},
});
