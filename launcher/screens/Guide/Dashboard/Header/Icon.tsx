import React, { FC } from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '@metacraft/ui';

import resources from '../../../../utils/resources';

import { ViewType } from '.';
import {sharedStyle} from "screens/Guide/shared";

interface Props {
	type: ViewType;
	onPress: () => void;
	isActive?: boolean;
}

const Icon: FC<Props> = ({ type, onPress, isActive = false }: Props) => {
	let resource = null;
	let label = null;

	switch (type) {
		case ViewType.Battlefield:
			resource = isActive
				? resources.guide.battlefieldIconActive
				: resources.guide.battlefieldIconNormal;
			label = 'Battlefield';
			break;
		case ViewType.Play:
			resource = isActive
				? resources.guide.playIconActive
				: resources.guide.playIconNormal;
			label = 'Play';
			break;
		case ViewType.Card:
			resource = isActive
				? resources.guide.cardIconActive
				: resources.guide.cardIconNormal;
			label = 'Card';
			break;
	}

	return (
		<TouchableOpacity onPress={onPress}>
			<Image source={resource} style={styles.image} resizeMode="contain" />
			<Text style={[styles.label, sharedStyle.textShadow]}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 100,
		height: 100,
	},
	label: {
		color: '#fff',
		fontFamily: 'Volkhov',
		fontWeight: 'bold',
		textAlign: 'center',
		marginTop: 8,
	},
});

export default Icon;
