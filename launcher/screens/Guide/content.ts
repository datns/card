import { ContentType } from 'screens/Guide/shared';
import resources from 'utils/resources';

export const battlefield: ContentType = {
	intro:
		'Take a look at the setup of the battlefield. Understanding this will give you an advantage in a match and get you closer to winning.',
	concepts: [
		{
			label: 'Hand',
			icon: resources.guide.handIcon,
			description:
				'Here are the cards you have available to summon on the battlefield each turn.\n' +
				'At the beginning of each turn, Adventurer will be able to draw 2 Cards from their deck.\n' +
				'The maximum number of cards on hand is 7. When hitting the limit, the adventurer will have to choose to discard exceeded amount of cards after drawing from the deck.',
		},
		{
			label: 'Deck',
			icon: resources.guide.deckIcon,
			description:
				'The deck contains all the cards available to summon each match. The maximum number of cards in the deck is 40. \n' +
				'\n' +
				'From the deck, cards will be drawn randomly to Hand before summoning to the battlefield.\n' +
				'\n' +
				'In the Beta version, Adventurers can construct the deck as they want to serve the best of their playing styles.',
		},
		{
			label: 'Magic Tower',
			icon: resources.guide.spellIcon,
			description:
				'During a match, Spell Cards must be placed in the magic tower before being activated base on each card’s condition. \n' +
				'\n' +
				'At the beginning of the match, only 2 slots for Spell Card will be available. Every 5 turns, 1 more slot will be added. The maximum number of Spell Cards that can be stored in the Magic Tower is 5. ',
		},
		// {
		// 	label: 'Grave',
		// 	icon: resources.guide.graveIcon,
		// 	description:
		// 		'Destroyed/ used cards will be gathered in the Graveyard area.\n' +
		// 		'From the Graveyard, cards with special abilities can be brought back to the match.',
		// },
		{
			label: 'Summon Zone',
			icon: resources.guide.summonZoneIcon,
			description:
				'Summon Zone is where Hero and Troop cards will be summoned to engage in combat\n' +
				'In the summon zone, cards will be placed on the left or right flank of the center card. \n' +
				'\n' +
				'When a card in the middle of the formation is destroyed, the empty position will be filled by the card next card to the left or right of it, based on the direction toward the center.',
		},
		{
			label: 'End Turn',
			icon: resources.guide.endTurnIcon,
			description:
				'After finishing placing the Hero/ Troop card on the battlefield and activating Spell Card - Clicking End Turn to start engaging with the opponent’s cards.',
		},
		{
			label: 'Health Point',
			icon: resources.guide.healthPointIcon,
			description:
				'Health Point is the decisive element to the result of a match. By reducing the HP of the opponent to 0, Adventurer will win the game.\n' +
				'\n' +
				'In the case the match time run out, Adventurer with a higher HP will win the match.',
		},
		{
			label: 'History',
			icon: resources.guide.historyIcon,
			description:
				'The history allows Adventurer to keep track of the match turn by turn',
		},
	],
};

export const play: ContentType = {
	intro:
		"To win the game, the player is required to: Reduce the opposing player's Health Points to zero",
	concepts: [
		{
			label: 'Draw',
			icon: resources.guide.drawIcon,
			description:
				'Each turn, draw 1 Hero card + 1 Troop\n' +
				'\n' +
				'Each 3 turns both players draw 5 spell cards select 3 and discard 2',
		},
		{
			label: 'Setup',
			icon: resources.guide.setupIcon,
			description:
				'Place 1 Hero Card in the center and 1 Troop Card from any side (úp bài) (Turn 1)\n' +
				'Setup spell if needed in the tower Initially, both teams have 2 towers. After every 5 turns, 1 more tower will be added\n' +
				'X seconds to setup\n' +
				'Confirm',
		},
		{
			label: 'Battle',
			icon: resources.guide.battleIcon,
			description:
				'After 2 players complete Card setup, Spell and all other card is played automatically\n' +
				'\n' +
				'Attack "Both sides attack at the same time\n' +
				'\n' +
				"Which card isn't face enemy card will attack directly to the wall.",
		},
	],
};

export const card: ContentType = {
	intro: '',
	concepts: [
		{
			label: 'Hero',
			icon: resources.guide.heroIcon,
			description:
				'Class: Each monster card will belong to a class, and each class will have different pros and cons.\n' +
				'Attack Point\n' +
				'Heath Point: when heath point reduce to 0, it will be move to grave yard\n' +
				'Defense Point: (some monster will has it by default, but some will get by spell/ card or skill), reduce the damage it takes by %, maximum is 50%\n' +
				'Skill:\n' +
				'            - Passive: skill has no cooldown to active, It will active if meets the condition\n' +
				'            - Active: Auto active before battle, after activated it will be countdown by turn before active it again (countdown by turn)',
			additional: [
				{
					title: 'Card Rarity',
					text: 'Card rarity can be recognized by the gems on the top of the card. Cards with higher rarities is harder to acquire in the [NFT Minting Event] as they have a lower drop rate. Cards can be 1 of 7 rarities: Card Rarity is going to be the most important index you need to get your attention as it will be determined how powerful this card is in general. Cards with higher rarities are harder to acquire in the NFT Minting Event as they have a lower drop rate. Cards can be 1 of 6 major rarities, and each major rarity includes 3 levels of minor rarities.',
				},
				{
					title: '5 Hero Classes',
					text: 'There are 5 main classes that represents different philosophies, playstyle and strategies. Knowing the specialty of your card class will create a huge advantage for you on the battlefield.',
				},
			],
		},
		{
			label: 'Spell',
			icon: resources.guide.spellIcon,
			description:
				'Spell cards do not have **a** set amount of attack/ defense/ health points on the card design.\n' +
				'Spell cards can be used to cast potentially match-turning spells determined by their abilities. Use spell cards to reinforce your creatures and play style, from supportive to damaging spells. Once a spell card has been used, the card will be sent to the void.',
		},
		{
			label: 'Troop',
			icon: resources.guide.troopIcon,
			description: 'Troop: \nSpecial Troop: summoned by Hero’s skill',
		},
	],
};
