import React from 'react';
import {
	Image,
	ImageBackground,
	ImageStyle,
	View,
	ViewStyle,
} from 'react-native';
import { DimensionState, dimensionState, Text } from '@metacraft/ui';
import UnderRealmButton from 'components/Marketplace/Button';
import { useDefaultHoveredStyle } from 'components/Marketplace/Button/shared';
import { useSnapshot } from 'utils/hook';
import resources from 'utils/resources';
import { iStyles } from 'utils/styles';

const Footer: React.FC<Record<string, unknown>> = () => {
	const { windowSize } = useSnapshot<DimensionState>(dimensionState);
	const width = Math.min(windowSize.width, iStyles.contentContainer.maxWidth);
	const backgroundContainer = {
		width,
		height: (width * 385) / 1555,
		alignItems: 'center',
		justifyContent: 'center',
	} as ViewStyle;

	const imageSize = {
		width: '50%',
		aspectRatio: 884 / 222,
	} as ImageStyle;
	return (
		<ImageBackground
			source={resources.guide.footerMainBackground}
			style={[iStyles.wideContainer, backgroundContainer]}
		>
			<View style={imageSize}>
				<ImageBackground
					source={resources.guide.footerContentBackground}
					style={{ flex: 1, alignItems: 'center', paddingTop: 20 }}
				>
					<Text style={{ color: 'black', fontWeight: 'bold', fontSize: 45 }}>
						GET STARTED TO PLAY
					</Text>
					<Text style={{ color: 'black', fontSize: 25 }}>
						Create your account to start playing
					</Text>
					<View
						style={{
							flexDirection: 'row',
							width: '70%',
							justifyContent: 'space-between',
							height: 50,
							position: 'absolute',
							bottom: 0
						}}
					>
						<UnderRealmButton
							style={{
								width: '48%',
								justifyContent: 'center'
							}}
						>
							<Text
								style={{
									textAlign: 'center',
								}}
							>
								{'Card Library'}
							</Text>
						</UnderRealmButton>
						<UnderRealmButton
							style={{
								width: '48%',
								justifyContent: 'center'
							}}
						>
							<Text
								style={{
									textAlign: 'center',
								}}
							>
								{'Ready to play?\nPlay now'}
							</Text>
						</UnderRealmButton>
					</View>
				</ImageBackground>
			</View>
		</ImageBackground>
	);
};

export default Footer;
