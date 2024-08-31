import { GridModel } from "../grid/GridModel";
import { Animator } from "./Animator";

export class PathAnimator extends Animator {
	readonly ANIMATION_STEP_TIMER: number = 50;

	private timers: any = [];

	animate(path: any[], visitedNodes: any[], gridModel: GridModel) {
		let pathCopy: any = [];
		let visitedNodesCopy: any = [];

		this.timers = [];

		let animationCounter: number = 0;

		let collections: OriginalClonePair[] = [];
		collections.push({ original: visitedNodes, clone: visitedNodesCopy });
		collections.push({ original: path, clone: pathCopy });

		for (let i = 0; i < collections.length; i++) {
			let pair: OriginalClonePair = collections[i];

			for (let j = 0; j < pair.original.length; j++) {
				//Store all timer IDs, as the animation can be cancelled
				//By storing these, clearTimeout can be called on all IDs
				this.timers.push(
					setTimeout(() => {
						pair.clone.push(pair.original[j]);

						gridModel.displayPath(pathCopy, visitedNodesCopy);
					}, animationCounter * this.ANIMATION_STEP_TIMER)
				);

				animationCounter++;
			}
		}
	}

	stop() {
		for (let i = 0; i < this.timers.length; i++) {
			clearTimeout(this.timers[i]);
		}
	}
}

interface OriginalClonePair {
	original: any[];
	clone: any[];
}
