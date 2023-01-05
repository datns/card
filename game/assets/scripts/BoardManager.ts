import Engine from '@metacraft/murg-engine';
import { _decorator, Animation, Component, Label, Node } from 'cc';

import { system } from './util/system';
import { sendConnect } from './network';

const { ccclass } = _decorator;
const { selectDeck, selectPlayer } = Engine;

interface Props {
	animation?: Animation;
	enemyDeckCount?: Label;
	playerDeckCount?: Label;
}

@ccclass('BoardManager')
export class BoardManager extends Component {
	animation: Animation;
	playerDeckCount: Label;
	playerHealth: Label;
	enemyDeckCount: Label;
	enemyHealth: Label;

	props: Props = {};

	start(): void {
		const cardTemplate = this.node.getChildByPath('Card Template') as Node;
		const unitTemplate = this.node.getChildByPath('Unit Template') as Node;
		const playerDeck = this.node.getChildByPath('Hud/Player Deck/foil') as Node;
		const enemyDeck = this.node.getChildByPath('Hud/Enemy Deck/foil') as Node;
		const centerExpo = this.node.getChildByPath('Guide/centerExpo') as Node;
		const leftExpo = this.node.getChildByPath('Guide/leftExpo') as Node;
		const rightExpo = this.node.getChildByPath('Guide/rightExpo') as Node;
		const playerHand = this.node.getChildByPath('Guide/playerHand') as Node;
		const playerGround = this.node.getChildByPath('Guide/playerGround') as Node;
		const summonZone = this.node.getChildByPath('Guide/summonZone') as Node;
		const enemyHand = this.node.getChildByPath('Guide/enemyHand') as Node;
		const enemyGround = this.node.getChildByPath('Guide/enemyGround') as Node;

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
		system.globalNodes.playerDeck = playerDeck;
		system.globalNodes.enemyDeck = enemyDeck;
		system.globalNodes.centerExpo = centerExpo;
		system.globalNodes.leftExpo = leftExpo;
		system.globalNodes.rightExpo = rightExpo;
		system.globalNodes.playerHand = playerHand;
		system.globalNodes.playerGround = playerGround;
		system.globalNodes.summonZone = summonZone;
		system.globalNodes.enemyHand = enemyHand;
		system.globalNodes.enemyGround = enemyGround;

		system.globalNodes.board.on('stateReady', this.onStateReady.bind(this));
		if (system.serverState) this.onStateReady();

		this.animation.play('ground-reveal');
		sendConnect();
	}

	onStateReady(): void {
		const player = selectPlayer(system.duel, system.playerIds.me);
		const enemy = selectPlayer(system.duel, system.playerIds.enemy);
		const playerDeck = selectDeck(system.duel, system.playerIds.me);
		const enemyDeck = selectDeck(system.duel, system.playerIds.enemy);

		this.playerDeckCount.string = playerDeck?.length?.toString?.() || '';
		this.playerHealth.string = player.health.toString();
		this.enemyDeckCount.string = enemyDeck?.length?.toString?.() || '';
		this.enemyHealth.string = enemy.health.toString();
	}
}
