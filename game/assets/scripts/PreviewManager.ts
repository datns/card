import { _decorator, Component } from 'cc';

import { CardManager } from './CardManager';

const { ccclass } = _decorator;

@ccclass('PreviewManager')
export class PreviewManager extends Component {
	public cardManager: CardManager;

	start(): void {
		this.node.on('mouse-leave', this.onMouseLeave.bind(this));
	}

	onMouseLeave(): void {
		this.node.setPosition(190, 740);

		if (this.cardManager) {
			this.cardManager.onMouseLeave();
		}
	}
}
