import { FC, useCallback, useMemo } from 'react';
import { ApolloProvider } from '@apollo/client/react';
import { Provider as MetacraftProvider } from '@metacraft/ui';
import { WalletError } from '@solana/wallet-adapter-base';
import { PhantomWalletAdapter } from '@solana/wallet-adapter-phantom';
import {
	ConnectionProvider,
	WalletProvider,
} from '@solana/wallet-adapter-react';
import { SolflareWalletAdapter } from '@solana/wallet-adapter-solflare';
import BrowserStack from 'stacks/Browser';
import { graphQlClient } from 'utils/graphql';
import { clusterUrl } from 'utils/helper';
import { useAppInit, useSnapshot } from 'utils/hook';
import { accountState } from 'utils/state/account';
import { appState } from 'utils/state/app';
import { launcherTheme } from 'utils/theme';

export const App: FC = () => {
	const { network } = useSnapshot(appState);
	const endpoint = useMemo(() => clusterUrl(network), [network]);
	const { profile, loading, forceConnect } = useSnapshot(accountState);
	const autoConnect = forceConnect || (!loading && !profile.id);

	const wallets = useMemo(
		() => [new PhantomWalletAdapter(), new SolflareWalletAdapter()],
		[network],
	);

	const useError = () => {
		return useCallback((error: WalletError) => {
			console.log(error);
		}, []);
	};

	useAppInit({
		withProfileFetch: true,
	});

	return (
		<ApolloProvider client={graphQlClient}>
			<ConnectionProvider endpoint={endpoint}>
				<WalletProvider
					autoConnect={autoConnect}
					wallets={wallets}
					onError={useError}
				>
					<MetacraftProvider theme={launcherTheme}>
						<BrowserStack />
					</MetacraftProvider>
				</WalletProvider>
			</ConnectionProvider>
		</ApolloProvider>
	);
};

export default App;
