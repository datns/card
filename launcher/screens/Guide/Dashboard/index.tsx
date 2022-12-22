import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
	useAnimatedScrollHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { DimensionState, dimensionState } from '@metacraft/ui';
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
	const [mainBgTop, setMainBgTop] = React.useState<number>(0);

	const scrollOffset = useSharedValue(0);
	const battlefieldRef = useRef<number | null>(null);
	const playRef = useRef<number | null>(null);
	const cardRef = useRef<number | null>(null);
	const scrollRef = useRef<Animated.ScrollView>(null);

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

	const onPress = (index: number) => {
		console.log(index);
		if (index === 0)
			scrollRef?.current?.scrollTo(battlefieldRef?.current || 0, 0, true);
		if (index === 1)
			scrollRef?.current?.scrollTo(playRef?.current || 0, 0, true);
		if (index === 2)
			scrollRef?.current?.scrollTo(cardRef?.current || 0, 0, true);
	};

	const viewWidth = responsiveLevel > 1 ? '100%' : '60%';

	return (
		<View style={[styles.container, iStyles.wideContainer]}>
			<Animated.Image
				source={resources.guide.mainBackground}
				style={animatedImage}
			/>
			<Animated.ScrollView
				onScroll={scrollHandler}
				scrollEventThrottle={16}
				contentContainerStyle={{ width: viewWidth, alignSelf: 'center' }}
				ref={scrollRef}
			>
				<Header onPress={onPress} />
				<View
					onLayout={(e) => {
						setMainBgTop(e.nativeEvent.layout.y);
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
			</Animated.ScrollView>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#000'
	},
});

export default GuideDashboard;
