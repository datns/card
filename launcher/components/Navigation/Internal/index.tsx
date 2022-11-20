import React, { FC } from 'react';
import {
	Image,
	ImageBackground,
	Linking,
	StyleSheet,
	TouchableOpacity,
	View,
} from 'react-native';
import { Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import {
	homeNav,
	localNavigations,
	NavigationConfig,
	navigationHeight,
} from 'components/Navigation/shared';
import { navigate } from 'stacks/Browser/shared';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import NavigationItem from './Item';

export const InternalNavigation: FC = () => {
	const onNavigate = (item: NavigationConfig) => {
		navigate(item.route as never, item.params);
	};

	return (
		<ImageBackground
			style={styles.container}
			source={resources.navigation.bg}
			resizeMode="repeat"
		>
			<View style={[iStyles.contentContainer, styles.contentContainer]}>
				<TouchableOpacity
					activeOpacity={0.9}
					onPress={() => onNavigate(homeNav)}
				>
					<Image source={resources.navigation.logo} style={styles.logo} />
				</TouchableOpacity>
				<View style={styles.navigationContainer}>
					{localNavigations.map((item) => {
						return (
							<NavigationItem
								key={item.title}
								item={item}
								onNavigate={onNavigate}
							/>
						);
					})}
				</View>
				<View style={styles.commandContainer}>
					<View style={styles.buttonContainer}>
						<UnderRealmButton
							style={styles.button}
							onPress={() =>
								// navigate('Game', { screen: 'Duel', params: { id: 'demo' } })
								Linking.openURL(
									'https://underrealm.stormgate.io/game/duel/demo',
								)
							}
						>
							<Text style={styles.buttonText}>Demo</Text>
						</UnderRealmButton>
					</View>
				</View>
			</View>
		</ImageBackground>
	);
};

export default InternalNavigation;

const logoHeight = 84;
const styles = StyleSheet.create({
	container: {
		backgroundColor: '#21150f',
		height: navigationHeight.local,
	},
	contentContainer: {
		flexDirection: 'row',
	},
	logo: {
		marginLeft: -24,
		marginRight: -64,
		width: (249 / 101) * logoHeight,
		height: logoHeight,
	},
	navigationContainer: {
		flex: 1,
		flexDirection: 'row',
	},
	commandContainer: {
		flexDirection: 'row',
		paddingRight: 20,
	},
	buttonContainer: {
		justifyContent: 'center',
		height: navigationHeight.local,
	},
	button: {
		width: 180,
	},
	buttonText: {
		textAlign: 'center',
		color: '#fff',
	},
});
