import React, { FC, Fragment, useEffect } from 'react';
import {
	Image,
	ImageBackground,
	Linking,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import { DrawerContentComponentProps } from '@react-navigation/drawer';
import UnderRealmLogo from 'components/Home/visuals/UnderRealmLogo';
import UserSolidIcon from 'components/icons/UserSolid';
import UnderRealmButton from 'components/Marketplace/Button';
import { sharedStyle } from 'screens/Home/shared';
import { drawerHelper } from 'stacks/Browser/shared';
import resources from 'utils/resources';

import { naviItemList } from './internal';

export const DrawerMenu: FC<DrawerContentComponentProps> = (props) => {
	const { navigation } = props;
	const activeOpacity = 0.7;
	const onClosePress = () => navigation.closeDrawer();
	const onLogoPress = () => navigation.navigate('Home');

	useEffect(() => {
		drawerHelper.navigation = navigation;
	}, []);

	return (
		<ImageBackground
			source={resources.navigation.mobileBackground}
			resizeMode="repeat"
			style={styles.container}
		>
			<View style={styles.innerContainer}>
				<TouchableOpacity onPress={onClosePress}>
					<Text style={styles.closeButton}>&times;</Text>
				</TouchableOpacity>
				<TouchableOpacity onPress={onLogoPress} activeOpacity={activeOpacity}>
					<UnderRealmLogo style={styles.logo} size={200} />
				</TouchableOpacity>
				<View style={styles.buttonGroup}>
					<TouchableOpacity activeOpacity={activeOpacity}>
						<ImageBackground
							source={resources.navigation.userIconBackground}
							style={styles.userIconContainer}
						>
							<UserSolidIcon />
						</ImageBackground>
					</TouchableOpacity>
					<UnderRealmButton
						style={styles.button}
						onPress={() =>
							Linking.openURL('https://underrealm.stormgate.io/game/duel/demo')
						}
					>
						<Text style={[sharedStyle.buttonText, { fontSize: 13 }]}>
							Play Demo
						</Text>
					</UnderRealmButton>
				</View>
				<Image
					source={resources.navigation.separator}
					style={styles.separator}
				/>
				<Fragment>
					{naviItemList.map((item) => (
						<TouchableOpacity
							key={item.id}
							style={styles.navItem}
							onPress={() => navigation.navigate(item.screen)}
						>
							<Text style={styles.navItemTitle}>{item.title}</Text>
						</TouchableOpacity>
					))}
				</Fragment>
			</View>
		</ImageBackground>
	);
};

export default DrawerMenu;

const styles = StyleSheet.create({
	container: {
		height: '100%',
		paddingVertical: 20,
		alignItems: 'center',
	},
	innerContainer: {
		width: 200,
	},
	closeButton: {
		fontSize: 36,
		fontWeight: '200',
		color: '#cdc8b5',
	},
	logo: {
		marginTop: 40,
		marginBottom: 20,
	},
	buttonGroup: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 20,
	},
	userIconContainer: {
		width: 35,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
	},
	button: {
		width: 150,
		height: 35,
	},
	separator: {
		width: 200,
		height: 3,
		marginBottom: 20,
	},
	navItem: {
		width: '100%',
		marginBottom: 10,
	},
	navItemTitle: {
		fontSize: 16,
		color: '#cdc8b5',
	},
});
