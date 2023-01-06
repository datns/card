import { _decorator, Component, Node } from 'cc';

import { animateFade, animateLabelFlip } from './tween/common';
import { system } from './util/system';

const { ccclass } = _decorator;

@ccclass('TurnController')
export class TurnController extends Component {
	unSubscribers: (() => void)[] = [];
	playerTurnGlow: Node;
	enemyTurnGlow: Node;
	turnLabel: Node;

	start(): void {
		this.playerTurnGlow = this.node.getChildByPath('Player Turn Glow') as Node;
		this.enemyTurnGlow = this.node.getChildByPath('Enemy Turn Glow') as Node;
		this.turnLabel = this.node.getChildByPath('Button/Label');

		this.unSubscribers.push(
			system.duel.subscribe('turn', this.onTurnChange.bind(this), true),
		);

		this.unSubscribers.push(
			system.duel.subscribe('phaseOf', this.onPhaseOfChange.bind(this), true),
		);
	}

	onDestroy(): void {
		this.unSubscribers.forEach((unSub) => unSub());
	}

	onTurnChange(turn: number): void {
		console.log(turn, '<-- turn changed');
	}

	onPhaseOfChange(owner: string): void {
		const isMyPhase = system.playerIds.me === owner;

		animateFade(this.playerTurnGlow, isMyPhase ? 255 : 0);
		animateFade(this.enemyTurnGlow, isMyPhase ? 0 : 255);
		animateLabelFlip(this.turnLabel, isMyPhase ? 'your turn' : 'enemy turn');
	}
}
