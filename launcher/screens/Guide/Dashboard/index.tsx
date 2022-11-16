import React, { FC } from 'react';
import { StyleSheet, Text, View } from 'react-native';

const GuideDashboard: FC = () => {
	return (
		<View style={styles.container}>
			<Text>How To Play</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'white',
	},
});

export default GuideDashboard;
