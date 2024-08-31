import { GridModel } from "../grid/GridModel";
import { IAction } from "./Action";

export class ToggleAction extends IAction {
	gridModel: GridModel;
	callback: (grid: any) => void;

	constructor(gridModel: GridModel) {
		super();

		this.gridModel = gridModel;
	}

	process(x: number, y: number): void {
		this.gridModel.toggleWalkable(x, y);
	}
}
