import React, { FC, useState } from 'react';
import { ActivityIndicator, StyleSheet, TextInput, View } from 'react-native';
import { useMutation } from '@apollo/client';
import { Hyperlink, modalActions, Text } from '@metacraft/ui';
import DiscordIcon from 'components/icons/Discord';
import GithubIcon from 'components/icons/GithubSolid';
import TwitterIcon from 'components/icons/Twitter';
import UnderRealmButton from 'components/Marketplace/Button';
import Subscribed from 'components/modals/GameSubscribe/Subscribed';
import { headingSize, sharedStyle } from 'screens/Home/shared';
import * as mutations from 'utils/graphql/mutation';
import { useInput } from 'utils/hook';
import { MetacraftGames } from 'utils/types';
import { validateEmail } from 'utils/validation';

export const StayConnected: FC = () => {
	const [loading, setLoading] = useState(false);
	const [subscribePressed, setSubscribePressed] = useState(false);
	const emailInput = useInput();
	const { hasError, errorMess } = validateEmail(emailInput.value);
	const [subscribeGame] = useMutation(mutations.subscribeGame);

	const onSubscribe = () => {
		setSubscribePressed(true);

		if (!hasError) {
			setLoading(true);

			subscribeGame({
				variables: {
					input: {
						email: emailInput.value,
						game: MetacraftGames.Card,
					},
				},
				onCompleted: () => {
					setLoading(false);
					emailInput.onChangeText('');

					modalActions.hide('gameSubscribe');

					modalActions.show({
						id: 'subscribed',
						component: Subscribed,
					});
				},
			});
		}
	};

	const buttonContent = loading ? (
		<ActivityIndicator color="white" />
	) : (
		<Text style={sharedStyle.buttonText}>Sign up to Newsletter</Text>
	);

	return (
		<View style={styles.container}>
			<Text style={sharedStyle.heading} responsiveSizes={headingSize}>
				Stay connected - Stay updated!
			</Text>
			<View style={styles.hyperLinkContainer}>
				<Hyperlink
					style={styles.hyperLink}
					href="https://discord.gg/sXcz9Em4AR"
					target="_blank"
				>
					<DiscordIcon size={42} />
				</Hyperlink>
				<Hyperlink
					style={styles.hyperLink}
					href="https://twitter.com/PlayUnderRealm"
					target="_blank"
				>
					<TwitterIcon size={40} />
				</Hyperlink>
				<Hyperlink
					style={styles.hyperLink}
					href="https://github.com/cocrafts"
					target="_blank"
				>
					<GithubIcon size={32} />
				</Hyperlink>
			</View>
			<View style={styles.inputContainer}>
				<View style={styles.inputBackgroundOverlay} />
				<View>
					<TextInput
						placeholder="Enter your email"
						placeholderTextColor={'#93867c'}
						style={styles.input}
						{...emailInput}
					/>
				</View>
			</View>
			{subscribePressed && hasError && (
				<Text style={styles.warning}>{errorMess}</Text>
			)}
			<UnderRealmButton style={styles.button} onPress={onSubscribe}>
				{buttonContent}
			</UnderRealmButton>
			<Text style={styles.subText}>
				By signing up, you consent to receive latest updates and special offers
				about Under Realm.
			</Text>
		</View>
	);
};

export default StayConnected;

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	hyperLinkContainer: {
		marginVertical: 20,
		flexDirection: 'row',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	hyperLink: {
		marginHorizontal: 10,
	},
	inputContainer: {
		borderRadius: 5,
		overflow: 'hidden',
	},
	inputBackgroundOverlay: {
		position: 'absolute',
		top: 0,
		bottom: 0,
		left: 0,
		right: 0,
		backgroundColor: '#130e0c',
		opacity: 0.9,
	},
	input: {
		width: 350,
		paddingHorizontal: 15,
		paddingVertical: 15,
		color: '#fff',
	},
	warning: {
		marginTop: 10,
		fontSize: 12,
		fontWeight: '300',
		color: '#ffc107',
	},
	button: {
		width: 250,
		marginVertical: 15,
	},
	subText: {
		textAlign: 'center',
		fontSize: 10,
		fontWeight: '300',
		color: '#fff',
		width: 250,
	},
});
