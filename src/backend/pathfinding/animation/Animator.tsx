import { GridManager } from "../grid/GridManager";

export abstract class Animator {
	abstract animate(
		path: any[],
		visitedNodes: any[],
		gridModel: GridManager
	): void;
	abstract stop(): void;
}

export class InstantAnimator extends Animator {
	animate(path: any[], visitedNodes: any[], gridModel: GridManager) {
		gridModel.displayPath(path, visitedNodes);
	}

	stop() {}
}
