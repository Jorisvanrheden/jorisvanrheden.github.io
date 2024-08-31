import { GridModel } from "../grid/GridModel";
import { IAction } from "./Action";

export class WalkableAction extends IAction {
	gridModel: GridModel;
	walkable: boolean;
	callback: (grid: any) => void;

	constructor(gridModel: GridModel, walkable: boolean) {
		super();

		this.gridModel = gridModel;
		this.walkable = walkable;
	}

	process(x: number, y: number): void {
		this.gridModel.setWalkable(x, y, this.walkable);
	}
}
