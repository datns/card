import React, { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import resources from '../../../../utils/resources';

import { ViewType } from '.';

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
			<Text style={styles.label}>{label}</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	image: {
		width: 60,
		height: 60,
	},
	label: {
		fontSize: 9,
		color: '#fff',
		textAlign: 'center',
		marginTop: 8,
	},
});

export default Icon;
