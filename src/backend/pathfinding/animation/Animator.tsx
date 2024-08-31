import { GridModel } from "../grid/GridModel";

export abstract class Animator {
	abstract animate(
		path: any[],
		visitedNodes: any[],
		gridModel: GridModel
	): void;
	abstract stop(): void;
}

export class InstantAnimator extends Animator {
	animate(path: any[], visitedNodes: any[], gridModel: GridModel) {
		gridModel.displayPath(path, visitedNodes);
	}

	stop() {}
}
