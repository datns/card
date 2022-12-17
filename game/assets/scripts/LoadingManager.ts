import { _decorator, Component, director, ProgressBar } from 'cc';

const { ccclass, property } = _decorator;

@ccclass('LoadingManager')
export class LoadingManager extends Component {
	@property(ProgressBar)
	progressBar: ProgressBar;

	start(): void {
		director.preloadScene(
			'Duel',
			(completedCount: number, totalCount: number) => {
				this.progressBar.progress = completedCount / totalCount;
			},
			() => {
				director.loadScene('Duel');
			},
		);
	}
}
