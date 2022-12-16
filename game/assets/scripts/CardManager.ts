import { _decorator, Animation, Component, Node, UIOpacity } from 'cc';

import { playAnimation } from './util/animation';
import { PreviewManager } from './PreviewManager';

const { ccclass } = _decorator;

interface Props {
	animation?: Animation;
	uiOpacity?: UIOpacity;
	cardPreview?: Node;
}

@ccclass('CardManager')
export class CardManager extends Component {
	props: Props = {};
	start(): void {
		this.props = {
			animation: this.node.getComponent('cc.Animation') as Animation,
			uiOpacity: this.node.getComponent('cc.UIOpacity') as UIOpacity,
			cardPreview: this.node.parent.parent.getChildByPath('Card Preview'),
		};

		this.bindMouseEvents();
	}

	bindMouseEvents(): void {
		this.node.on('mouse-enter', this.onMouseEnter.bind(this));
	}

	onMouseEnter(): void {
		const { cardPreview, uiOpacity } = this.props;
		const previewManager = cardPreview.getComponent(
			'PreviewManager',
		) as PreviewManager;

		previewManager.cardManager = this;
		uiOpacity.opacity = 30;
		playAnimation(cardPreview, 'fade-in');
		cardPreview.setPosition(0, -180);
	}

	onMouseLeave(): void {
		const { cardPreview, uiOpacity } = this.props;

		uiOpacity.opacity = 255;
		cardPreview.setPosition(190, 740);
	}
}
