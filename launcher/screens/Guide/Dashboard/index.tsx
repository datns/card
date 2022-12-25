import React, { useRef } from 'react';
import { Image, NativeScrollEvent, StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { DimensionState, dimensionState } from '@metacraft/ui';
import ScrollLayout from 'components/layouts/Scroll';
import Elemental from 'screens/Guide/Dashboard/Elemental';
import PlayingUnderRealm from 'screens/Guide/Dashboard/PlayingUnderRealm';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

import BattlefieldOverview from './BattlefieldOverview';
import Cards from './Cards';
import Footer from './Footer';
import Header from './Header';

const GuideDashboard: React.FC = () => {
	const { windowSize, responsiveLevel } =
		useSnapshot<DimensionState>(dimensionState);
	const width = Math.min(windowSize.width, iStyles.wideContainer.maxWidth);
	const mainBgTop = useSharedValue<number>(0);
	const maxOffset = useSharedValue<number>(0);

	const scrollOffset = useSharedValue(0);
	const battlefieldRef = useRef<number | null>(null);
	const playRef = useRef<number | null>(null);
	const cardRef = useRef<number | null>(null);
	const scrollRef = useRef<Animated.ScrollView>(null);

	const onScroll = (e: NativeScrollEvent) => {
		if (e.contentOffset.y <= maxOffset.value) {
			scrollOffset.value = e.contentOffset.y;
		}
	};

	const animatedImage = useAnimatedStyle(() => ({
		width,
		height: windowSize.height,
		alignItems: 'center',
		position: 'absolute',
		backgroundColor: 'black',
		transform: [
			{
				translateY:
					scrollOffset.value <= mainBgTop.value
						? mainBgTop.value
						: scrollOffset.value,
			},
		],
	}));

	const onPress = (index: number) => {
		if (index === 0)
			scrollRef?.current?.scrollTo(battlefieldRef?.current || 0, 0, true);
		if (index === 1)
			scrollRef?.current?.scrollTo(playRef?.current || 0, 0, true);
		if (index === 2)
			scrollRef?.current?.scrollTo(cardRef?.current || 0, 0, true);
	};

	const viewWidth = responsiveLevel > 1 ? '100%' : '60%';

	return (
		<ScrollLayout
			scrollRef={scrollRef}
			onScroll={onScroll}
			style={[styles.container, iStyles.wideContainer]}
		>
			<Animated.View style={animatedImage}>
				<Image
					source={resources.guide.mainBackground}
					resizeMode="contain"
					style={{ width: '100%', height: '100%' }}
				/>
			</Animated.View>
			<View
				style={{ width: viewWidth, alignSelf: 'center' }}
				onLayout={({ nativeEvent }) =>
					(maxOffset.value = nativeEvent.layout.height - windowSize.height)
				}
			>
				<Header onPress={onPress} />
				<View
					onLayout={(e) => {
						mainBgTop.value = e.nativeEvent.layout.y;
						battlefieldRef.current = e.nativeEvent.layout.y;
					}}
				>
					<BattlefieldOverview />
				</View>
				<View onLayout={(e) => (playRef.current = e.nativeEvent.layout.y)}>
					<PlayingUnderRealm />
				</View>
				<View onLayout={(e) => (cardRef.current = e.nativeEvent.layout.y)}>
					<Cards />
				</View>
				<Elemental />
				<Footer />
			</View>
		</ScrollLayout>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000',
	},
});

export default GuideDashboard;
