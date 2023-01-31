import { CardTypeProps } from 'screens/CardLibrary/Library/shared';
import resources from 'utils/resources';

export const CardTypeContent: CardTypeProps[] = [
	{
		label: 'All Cards',
		value: -1,
		image: resources.card.type.all,
		displayName: 'All Cards',
	},
	{
		label: 'Hero',
		value: 0,
		image: resources.card.type.hero,
		displayName: 'Hero Cards',
	},
	{
		label: 'Troop',
		value: 1,
		image: resources.card.type.troop,
		displayName: 'Troop Cards',
	},
	{
		label: 'Spell',
		value: 2,
		image: resources.card.type.spell,
		displayName: 'Spell Cards',
	},
];

export const Classes: {
	label: string;
	value: string;
}[] = [
	{
		label: 'All Classes',
		value: 'all',
	},
	{
		label: 'Assassin',
		value: 'assassin',
	},
	{
		label: 'Summoner',
		value: 'summoner',
	},
	{
		label: 'Tank',
		value: 'tank',
	},
	{
		label: 'Warrior',
		value: 'warrior',
	},
	{
		label: 'Wizard',
		value: 'wizard',
	},
];

export const Elemental: {
	label: string;
	value: string;
}[] = [
	{
		label: 'Element',
		value: 'element',
	},
	{
		label: 'Dark',
		value: 'dark',
	},
	{
		label: 'Earth',
		value: 'earth',
	},
	{
		label: 'Fire',
		value: 'fire',
	},
	{
		label: 'Light',
		value: 'light',
	},
	{
		label: 'Metal',
		value: 'metal',
	},
	{
		label: 'Water',
		value: 'water',
	},
	{
		label: 'Wood',
		value: 'wood',
	},
];

export const Attribute: number[] = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
