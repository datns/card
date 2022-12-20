import { WalletAdapterNetwork as Network } from '@solana/wallet-adapter-base';

export const isDevBranch = gitBranch === 'dev';

interface Configs {
	clientKey: string;
	defaultNetwork: Network;
}

export default {
	clientKey:
		'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImhvbWUiLCJpYXQiOjE2NTA0MDQ2MzV9.wBHZOC5odvk9u7Izi6Z-pEzIv8IJjafH94vYpCuWUy0',
	defaultNetwork: isDevBranch ? Network.Devnet : Network.Mainnet,
} as Configs;
