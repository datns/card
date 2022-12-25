import React, { FC, Fragment } from 'react';
import {
	Image,
	ImageBackground,
	ImageStyle,
	StyleSheet,
	TouchableOpacity,
	View,
	ViewStyle,
} from 'react-native';
import { Text } from '@metacraft/ui';
import BurgerIcon from 'components/icons/Burger';
import UserSolidIcon from 'components/icons/UserSolid';
import UnderRealmButton from 'components/Marketplace/Button';
import {
	homeNav,
	localNavigations,
	NavigationConfig,
	navigationHeight,
} from 'components/Navigation/shared';
import { drawerHelper, navigate } from 'stacks/Browser/shared';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import NavigationItem from './Item';

interface Props {
	isMobile?: boolean;
	isHidingPlayButton?: boolean;
}

export const InternalNavigation: FC<Props> = ({
	isMobile,
	isHidingPlayButton,
}) => {
	const backgroundResizeMode = isMobile ? 'cover' : 'repeat';
	const onNavigate = (item: NavigationConfig) => {
		navigate(item.route as never, item.params);
	};

	const mobileContentContainerStyle = isMobile
		? ({
				paddingLeft: 15,
				justifyContent: 'space-between',
		  } as ViewStyle)
		: {};

	const mobileLogo = isMobile
		? ({
				marginRight: 0,
				marginLeft: 0,
		  } as ImageStyle)
		: {};

	const rightContent = isMobile ? (
		// Temporally hiding
		// <TouchableOpacity>
		// 	<UserSolidIcon size={28} />
		// </TouchableOpacity>
		<View />
	) : isHidingPlayButton ? (
		<View />
	) : (
		<UnderRealmButton
			style={styles.button}
			onPress={
				() => navigate('Game')
				// Linking.openURL('https://underrealm.stormgate.io/game/duel/demo')
			}
		>
			<Text style={styles.buttonText}>Play</Text>
		</UnderRealmButton>
	);

	return (
		<ImageBackground
			style={styles.container}
			source={resources.navigation.bg}
			resizeMode={backgroundResizeMode}
		>
			<View
				style={[
					iStyles.contentContainer,
					styles.contentContainer,
					mobileContentContainerStyle,
				]}
			>
				{isMobile && (
					<TouchableOpacity
						style={styles.buttonContainer}
						onPress={() => {
							drawerHelper.navigation?.openDrawer();
						}}
					>
						<BurgerIcon size={26} />
					</TouchableOpacity>
				)}

				<Fragment>
					<TouchableOpacity
						activeOpacity={0.9}
						onPress={() => onNavigate(homeNav)}
					>
						<Image
							source={resources.navigation.logo}
							style={[styles.logo, mobileLogo]}
						/>
					</TouchableOpacity>
					{!isMobile && (
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
					)}
				</Fragment>

				<View style={styles.commandContainer}>
					<View style={styles.buttonContainer}>{rightContent}</View>
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
		paddingRight: 15,
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
