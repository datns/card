import { _decorator, Button, Color, Component, Node } from 'cc';

import { animateFade, animateSwapLabel } from './tween/common';
import { setCursor } from './util/helper';
import { system } from './util/system';
import { sendEndTurn } from './network';

const { ccclass } = _decorator;
const NodeEvents = Node.EventType;
const ButtonEvents = Button.EventType;

@ccclass('TurnController')
export class TurnController extends Component {
	unSubscribers: (() => void)[] = [];
	playerTurnGlow: Node;
	enemyTurnGlow: Node;
	turnLabel: Node;
	orb: Node;

	start(): void {
		this.playerTurnGlow = this.node.getChildByPath('Orb/Player Glow') as Node;
		this.enemyTurnGlow = this.node.getChildByPath('Orb/Enemy Glow') as Node;
		this.turnLabel = this.node.getChildByPath('Orb/Button/Label');
		this.orb = this.node.getChildByPath('Orb') as Node;

		this.orb.on(NodeEvents.MOUSE_ENTER, this.onMouseEnter.bind(this));
		this.orb.on(NodeEvents.MOUSE_LEAVE, this.onMouseLeave.bind(this));
		this.orb.on(ButtonEvents.CLICK, this.onButtonClick.bind(this));

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

		this.orb.getComponent(Button).interactable = isMyPhase;
		animateFade(this.playerTurnGlow, isMyPhase ? 255 : 0);
		animateFade(this.enemyTurnGlow, isMyPhase ? 0 : 255);
		animateSwapLabel(
			this.turnLabel,
			isMyPhase ? 'end turn' : 'enemy turn',
			isMyPhase
				? Color.fromHEX(new Color(), '#4da7ea')
				: Color.fromHEX(new Color(), '#ee5846'),
		);
	}

	onMouseEnter(): void {
		setCursor('pointer');
	}

	onMouseLeave(): void {
		setCursor('auto');
	}

	onButtonClick(): void {
		sendEndTurn();
	}
}
