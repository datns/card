import Engine from '@metacraft/murg-engine';
import { _decorator, Animation, Component, instantiate, Label, Node } from 'cc';

import { sendDuelConnect } from './network/instance';
import { revealPlayerCard } from './tween/card';
import { system } from './util/system';

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
		const playerDeck = this.node.getChildByPath('Hud/Player Deck/foil') as Node;
		const enemyDeck = this.node.getChildByPath('Hud/Enemy Deck/foil') as Node;
		const expo = this.node.getChildByPath('Guide/expo') as Node;

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
		system.globalNodes.playerDeck = playerDeck;
		system.globalNodes.enemyDeck = enemyDeck;
		system.globalNodes.expo = expo;

		system.globalNodes.board.on('stateReady', this.onStateReady.bind(this));
		if (system.serverState) this.onStateReady();

		this.animation.play('ground-reveal');
		this.distributeCard();
		sendDuelConnect();
	}

	distributeCard(): void {
		const node = instantiate(system.globalNodes.cardTemplate);

		node.parent = this.node.parent;
		revealPlayerCard(node);
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
