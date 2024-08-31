import GridModel from "../grid/GridModel";
import { Node } from "./Node";

export interface PathfindingResult {
	path: any[];
	visitedNodes: any[];
}

export abstract class PathfindingStrategy {
	abstract calculatePath(grid: GridModel, start: any, target: any): any;

	collectionContains(collection: any[], item: any) {
		for (let i = 0; i < collection.length; i++) {
			if (collection[i].x === item.x && collection[i].y === item.y) return true;
		}
		return false;
	}

	constructPath(target: Node) {
		let path: Node[] = [];

		let activeNode = target;

		while (activeNode !== undefined) {
			path.push(activeNode);

			activeNode = activeNode.link;
		}

		return path.reverse();
	}
}
