import React, { FC, useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from '@metacraft/ui';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import { drawerHelper } from 'stacks/Browser/shared';

export const DrawerMenu: FC<DrawerContentComponentProps> = (props) => {
	useEffect(() => {
		drawerHelper.navigation = props.navigation;
	}, []);

	return (
		<View style={styles.container}>
			<Text>Drawer</Text>
		</View>
	);
};

export default DrawerMenu;

const styles = StyleSheet.create({
	container: {},
});
