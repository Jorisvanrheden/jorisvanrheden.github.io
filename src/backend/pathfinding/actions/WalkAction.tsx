import { GridManager } from "../grid/GridManager";
import { IAction } from "./Action";

export class WalkableAction extends IAction {
	gridModel: GridManager;
	walkable: boolean;
	callback: (grid: any) => void;

	constructor(gridModel: GridManager, walkable: boolean) {
		super();

		this.gridModel = gridModel;
		this.walkable = walkable;
	}

	process(x: number, y: number): void {
		this.gridModel.setWalkable(x, y, this.walkable);
	}
}
