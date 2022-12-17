import React, { FC, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { DimensionState, dimensionState } from '@metacraft/ui';
import PlayingUnderRealm from 'screens/Guide/Dashboard/PlayingUnderRealm';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import BattlefieldOverview from './BattlefieldOverview';
import Cards from './Cards';
import Footer from './Footer';
import Header from './Header';

const GuideDashboard: FC = () => {
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);
	const width = Math.min(windowSize.width, iStyles.contentContainer.maxWidth);
	const [mainBgTop, setMainBgTop] = useState<number>(0);

	const scrollOffset = useSharedValue(0);

	const scrollHandler = useAnimatedScrollHandler({
		onScroll: ({ contentOffset }) => {
			scrollOffset.value = contentOffset.y;
		},
	});

	const animatedImage = useAnimatedStyle(() => ({
		width,
		height: (width * 576) / 864,
		alignItems: 'center',
		position: 'absolute',
		top: mainBgTop,
		backgroundColor: 'black',
		transform: [
			{
				translateY:
					scrollOffset.value <= mainBgTop ? -scrollOffset.value : -mainBgTop,
			},
		],
	}));

	return (
		<View style={{ flex: 1, backgroundColor: 'black' }}>
			<Animated.Image
				source={resources.guide.mainBackground}
				style={animatedImage}
			/>
			<Animated.ScrollView onScroll={scrollHandler} scrollEventThrottle={16}>
				<Header />
				<View onLayout={(e) => setMainBgTop(e.nativeEvent.layout.y)}>
					<BattlefieldOverview />
				</View>
				<PlayingUnderRealm />
				<Cards />
				<Footer />
			</Animated.ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({});

export default GuideDashboard;
