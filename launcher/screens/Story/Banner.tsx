import React from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import Animated from 'react-native-reanimated';
import { Hoverable, Text } from '@metacraft/ui';
import { banner } from 'screens/Story/content';

import { sharedStyle, useHoveredStyle } from './shared';

const Banner: React.FC = () => {
	const [selectedBanner, setSelectedBanner] = React.useState<number>(0);
	const renderButton = () => {
		return (
			<View style={{ flexDirection: 'row' }}>
				{banner.map((item, index) => {
					const onPress = () => {
						setSelectedBanner(index);
					};

					const isActive = index === selectedBanner;
					return (
						<View key={item.label}>
							<TouchableOpacity
								style={styles.button}
								onPress={onPress}
								disabled={isActive}
							>
								<Hoverable animatedStyle={useHoveredStyle}>
									<Animated.View
										style={{ backgroundColor: 'red', alignItems: 'center' }}
									>
										<Image
											source={isActive ? item.activeIcon : item.icon}
											style={{ width: 52, aspectRatio: 1, alignSelf: 'center' }}
											resizeMode="contain"
										/>
										<Text
											style={[
												{
													textAlign: 'center',
													color: '#FFFBDF',
													opacity: isActive ? 1 : 0.5,
												},
												sharedStyle.textShadow,
											]}
										>
											{item.label}
										</Text>
									</Animated.View>
								</Hoverable>
							</TouchableOpacity>
							<View style={styles.indicator} />
						</View>
					);
				})}
			</View>
		);
	};

	return (
		<View>
			{renderButton()}
			<View style={styles.contentContainer}>
				<Image
					source={banner[selectedBanner].image}
					style={{
						width: '60%',
						aspectRatio: 503 / 712,
						marginBottom: 60,
					}}
					resizeMode="contain"
				/>
				<Text
					responsiveSizes={[35]}
					style={[sharedStyle.heading, { marginBottom: 20 }]}
				>
					{banner[selectedBanner].title}
				</Text>
				<Text style={sharedStyle.subContent}>
					{banner[selectedBanner].description}
				</Text>
			</View>
		</View>
	);
};

export default Banner;

const styles = StyleSheet.create({
	contentContainer: {
		width: '100%',
		borderWidth: 1,
		borderColor: '#423c36',
		marginTop: -3,
		alignItems: 'center',
		padding: 80,
	},
	button: {
		marginHorizontal: 40,
		alignItems: 'center',
	},
	indicator: {
		width: 6,
		height: 6,
		transform: [
			{
				rotate: '45deg',
			},
		],
		backgroundColor: '#423c36',
		alignSelf: 'center',
		marginTop: 20,
	},
});
