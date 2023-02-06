import { FC } from 'react';
import { Linking, StyleSheet, View } from 'react-native';
import { Hyperlink, modalActions, ModalConfigs, Text } from '@metacraft/ui';
import { useSnapshot } from 'utils/hook';
import { signOut } from 'utils/lib/auth';
import { AccountState, accountState } from 'utils/state/account';
import { noSelect } from 'utils/styles';

interface Props {
	config: ModalConfigs;
}

const styles = StyleSheet.create({
	container: {
		...noSelect,
		minWidth: 120,
		backgroundColor: '#0b0d12',
		paddingVertical: 8,
		paddingHorizontal: 12,
		borderRadius: 18,
		borderWidth: 2,
		borderColor: 'rgba(255, 255, 255, 0.025)',
	},
	heading: {
		fontSize: 11,
		color: 'rgba(255, 255, 255, 0.5)',
		textAlign: 'center',
		marginVertical: 6,
	},
	hyperLink: {
		fontSize: 11,
		textAlign: 'center',
		marginVertical: 6,
	},
});

export const SignedMenu: FC<Props> = ({ config }) => {
	const { profile } = useSnapshot<AccountState>(accountState);
	const onMyProfilePress = () => {
		Linking.openURL(`https://stormgate.io/profile/${profile.address}`);
		modalActions.hide(config.id as string);
	};

	const innerSignOut = async () => {
		await signOut();
		modalActions.hide(config.id as string);
	};

	return (
		<View style={styles.container}>
			<Text style={styles.heading}>Signed Menu</Text>
			<Hyperlink
				style={styles.hyperLink}
				onPress={onMyProfilePress}
				title="My Profile"
			/>
			<Hyperlink
				style={styles.hyperLink}
				onPress={innerSignOut}
				title="Sign Out"
			/>
		</View>
	);
};

export default SignedMenu;
