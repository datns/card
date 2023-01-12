import Engine, { PlayerState } from '@metacraft/murg-engine';
import { _decorator, Animation, Component, Label, Node } from 'cc';

import { selectHandNode } from './util/helper';
import { getHandExpos } from './util/layout';
import { system } from './util/system';
import { sendConnect } from './network';
import { simpleMove } from './tween';

const { ccclass } = _decorator;
const { DuelPlace, selectStateKey } = Engine;

interface Props {
	animation?: Animation;
	enemyDeckCount?: Label;
	playerDeckCount?: Label;
}

@ccclass('BoardManager')
export class BoardManager extends Component {
	unSubscribers: (() => void)[] = [];
	animation: Animation;
	playerDeckCount: Label;
	playerHealth: Label;
	enemyDeckCount: Label;
	enemyHealth: Label;

	props: Props = {};

	start(): void {
		const cardTemplate = this.node.getChildByPath('Card Template') as Node;
		const unitTemplate = this.node.getChildByPath('Unit Template') as Node;
		const unitPreview = this.node.getChildByPath('Unit Preview') as Node;
		const playerDeck = this.node.getChildByPath('Hud/Player Deck/foil') as Node;
		const enemyDeck = this.node.getChildByPath('Hud/Enemy Deck/foil') as Node;
		const centerExpo = this.node.getChildByPath('Guide/centerExpo') as Node;
		const leftExpo = this.node.getChildByPath('Guide/leftExpo') as Node;
		const rightExpo = this.node.getChildByPath('Guide/rightExpo') as Node;
		const playerHand = this.node.getChildByPath('playerHand') as Node;
		const enemyHand = this.node.getChildByPath('enemyHand') as Node;
		const playerGround = this.node.getChildByPath('playerGround') as Node;
		const enemyGround = this.node.getChildByPath('enemyGround') as Node;
		const playerHandGuide = this.node.getChildByPath(
			'Guide/playerHand',
		) as Node;
		const playerGroundGuide = this.node.getChildByPath(
			'Guide/playerGround',
		) as Node;
		const enemyHandGuide = this.node.getChildByPath('Guide/enemyHand') as Node;
		const enemyGroundGuide = this.node.getChildByPath(
			'Guide/enemyGround',
		) as Node;
		const summonZoneGuide = this.node.getChildByPath(
			'Guide/summonZone',
		) as Node;

		this.animation = this.node.getComponent('cc.Animation') as Animation;
		this.playerDeckCount = this.node
			.getChildByPath('Hud/playerDeckCount')
			.getComponent('cc.Label') as Label;
		this.playerHealth = this.node
			.getChildByPath('Hud/playerHealth')
			.getComponent('cc.Label') as Label;
		this.enemyDeckCount = this.node
			.getChildByPath('Hud/enemyDeckCount')
			.getComponent('cc.Label') as Label;
		this.enemyHealth = this.node
			.getChildByPath('Hud/enemyHealth')
			.getComponent('cc.Label') as Label;

		system.globalNodes.board = this.node;
		system.globalNodes.cardTemplate = cardTemplate;
		system.globalNodes.unitTemplate = unitTemplate;
		system.globalNodes.unitPreview = unitPreview;
		system.globalNodes.playerDeck = playerDeck;
		system.globalNodes.enemyDeck = enemyDeck;
		system.globalNodes.centerExpo = centerExpo;
		system.globalNodes.leftExpo = leftExpo;
		system.globalNodes.rightExpo = rightExpo;
		system.globalNodes.playerHand = playerHand;
		system.globalNodes.enemyHand = enemyHand;
		system.globalNodes.playerGround = playerGround;
		system.globalNodes.enemyGround = enemyGround;
		system.globalNodes.playerHandGuide = playerHandGuide;
		system.globalNodes.playerGroundGuide = playerGroundGuide;
		system.globalNodes.enemyHandGuide = enemyHandGuide;
		system.globalNodes.enemyGroundGuide = enemyGroundGuide;
		system.globalNodes.summonZoneGuide = summonZoneGuide;

		system.globalNodes.board.on('stateReady', this.onStateReady.bind(this));
		if (system.context) this.onStateReady();

		this.animation.play('ground-reveal');
		sendConnect();
	}

	onDestroy(): void {
		this.unSubscribers.forEach((unSub) => unSub());
	}

	onStateReady(): void {
		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.me, DuelPlace.Player),
				this.onPlayerUpdate.bind(this),
				true,
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.enemy, DuelPlace.Player),
				this.onEnemyUpdate.bind(this),
				true,
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.me, DuelPlace.Deck),
				this.onPlayerDeckUpdate.bind(this),
				true,
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.enemy, DuelPlace.Deck),
				this.onEnemyDeckUpdate.bind(this),
				true,
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.me, DuelPlace.Hand),
				this.onPlayerHandUpdate.bind(this),
			),
		);

		this.unSubscribers.push(
			system.duel.subscribe(
				selectStateKey(system.duel, system.playerIds.enemy, DuelPlace.Hand),
				this.onEnemyHandUpdate.bind(this),
			),
		);
	}

	onPlayerUpdate(player: PlayerState): void {
		this.playerHealth.string = String(player.health);
	}

	onPlayerDeckUpdate(deck: string[]): void {
		this.playerDeckCount.string = String(deck.length);
	}

	onEnemyUpdate(enemy: PlayerState): void {
		this.enemyHealth.string = String(enemy.health);
	}

	onEnemyDeckUpdate(deck: string[]): void {
		this.enemyDeckCount.string = String(deck.length);
	}

	onPlayerHandUpdate(hand: []): void {
		this.reArrangeHand(system.playerIds.me, hand);
	}

	onEnemyHandUpdate(hand: []): void {
		this.reArrangeHand(system.playerIds.enemy, hand);
	}

	reArrangeHand(owner: string, hand: []): void {
		const handPositions = getHandExpos(selectHandNode(owner), hand.length);

		for (let i = 0; i < hand.length; i += 1) {
			const cardNode = system.cardRefs[hand[i]];

			if (cardNode) {
				simpleMove(cardNode, handPositions[i]);
			}
		}
	}
}
