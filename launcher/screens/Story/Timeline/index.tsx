import React from 'react';
import {
	Image,
	ImageBackground,
	ScrollView,
	StyleProp,
	StyleSheet,
	View,
	ViewStyle,
} from 'react-native';
import { DimensionState, dimensionState } from '@metacraft/ui';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';

import TimelineItem from './TimelineItem';

interface TimelineProps {
	containerStyle?: StyleProp<ViewStyle>;
	isNarrow?: boolean;
}

const Timeline: React.FC<TimelineProps> = ({
	containerStyle,
	isNarrow = false,
}) => {
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);

	const scrollRef = React.useRef<ScrollView>(null);

	React.useLayoutEffect(() => {
		if (isNarrow)
			scrollRef?.current?.scrollTo({
				x: windowSize.width + 60,
				y: 0,
				animated: true,
			});
	}, [isNarrow]);
	const renderNarrowView = () => {
		return (
			<ScrollView
				horizontal
				style={{ marginTop: 40 }}
				showsHorizontalScrollIndicator={false}
				ref={scrollRef}
			>
				<TimelineItem isActive={false} isPassive />
				<TimelineItem isActive={false} isPassive />
				<TimelineItem
					isActive
					isPassive={false}
					iconActive={resources.story.externalWarActive}
					name="The External War"
				/>
				<TimelineItem isActive={false} isPassive />
				<TimelineItem isActive={false} isPassive />
			</ScrollView>
		);
	};

	if (isNarrow) return renderNarrowView();

	return (
		<View style={[styles.container, containerStyle]} pointerEvents="none">
			<ImageBackground source={resources.story.ellipse} style={styles.ellipse}>
				<View style={styles.chevronContainer}>
					<Image source={resources.story.chevron} style={styles.chevron} />
					<Image
						source={resources.story.chevron}
						style={[
							styles.chevron,
							{
								transform: [{ rotateY: '180deg' }],
							},
						]}
					/>
				</View>
				<View style={styles.lineItem1}>
					<TimelineItem isActive={false} isPassive />
					<TimelineItem isActive={false} isPassive />
				</View>
				<View style={styles.lineItem2}>
					<TimelineItem isActive={false} isPassive />
					<TimelineItem isActive={false} isPassive />
				</View>
				<View style={styles.lineItem3}>
					<TimelineItem
						isActive
						isPassive={false}
						iconActive={resources.story.externalWarActive}
						name="The External War"
					/>
				</View>
			</ImageBackground>
		</View>
	);
};

export default Timeline;

const styles = StyleSheet.create({
	container: {
		alignSelf: 'center',
		position: 'absolute',
		bottom: -120,
	},
	ellipse: {
		width: 1183,
		aspectRatio: 1183 / 320,
		alignItems: 'center',
	},
	chevronContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
	},
	chevron: {
		width: 30,
		height: 34,
	},
	lineItem1: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		left: -60,
		right: -60,
		top: 40,
		position: 'absolute',
	},
	lineItem2: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		position: 'absolute',
		top: 200,
		left: 160,
		right: 160,
	},
	lineItem3: {
		position: 'absolute',
		bottom: -120,
	},
});
