import Engine, { CardState } from '@metacraft/murg-engine';
import { _decorator, Component, EventMouse, Node, UIOpacity } from 'cc';

import { raiseCardAnimate, raisePreviewAnimate } from './tween/card';
import { system } from './util/system';

const { ccclass } = _decorator;
const { selectHand } = Engine;
const NodeEvents = Node.EventType;

@ccclass('DuelManager')
export class DuelManager extends Component {
	start(): void {
		system.globalNodes.duel = this.node;
		system.globalNodes.cardPreview = this.node.getChildByPath('Card Preview');

		this.node.on(NodeEvents.MOUSE_UP, this.onMouseUp.bind(this));
		this.node.on(NodeEvents.MOUSE_MOVE, this.onMouseMove.bind(this));
	}

	onMouseUp(): void {
		system.dragging = false;
		system.activeCard = null;
	}

	onMouseMove(e: EventMouse): void {
		if (system.dragging && system.activeCard) {
			const { x, y } = e.getUILocation();
			system.activeCard.setWorldPosition(x, y, 0);
		} else if (system.duel && system.playerIds) {
			const handCards = selectHand(system.duel, system.playerIds.me);
			const handPosition = system.globalNodes.playerHand.getWorldPosition();
			const mousePosition = e.getUILocation();
			let chosen: { card: Node; distance: number; state: CardState };

			/* <- Mouse moving near player Hand area */
			if (mousePosition.y < handPosition.y + 106) {
				for (let i = 0; i < handCards.length; i += 1) {
					const state = handCards[i];
					const card = system.cardRefs[state.id];
					if (card) {
						const cardPosition = card.getWorldPosition();
						const distance = Math.abs(mousePosition.x - cardPosition.x);
						if (distance < (chosen?.distance || 70)) {
							chosen = { card, state, distance };
						}
					}
				}
			}

			if (chosen) {
				if (chosen.card.uuid !== system.activeCard?.uuid) {
					if (system.activeCard) {
						this.onCardLeave(system.activeCard);
					}

					this.onCardHover(chosen.card, chosen.state);
					system.activeCard = chosen.card;
				}
			} else if (system.activeCard) {
				this.onCardLeave(system.activeCard);
				system.activeCard = null;
			}
		}
	}

	onCardHover(node: Node, state: CardState): void {
		system.globalNodes.cardPreview.setPosition(node.position.x, -168);
		raiseCardAnimate(node, 100);
		raisePreviewAnimate(system.globalNodes.cardPreview);
	}

	onCardLeave(node: Node): void {
		raiseCardAnimate(node, 0);
		system.globalNodes.cardPreview.setPosition(190, 740);
	}
}
