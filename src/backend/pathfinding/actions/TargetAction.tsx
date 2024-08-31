import { GridModel } from "../grid/GridModel";
import { IAction } from "./Action";

export class TargetAction extends IAction {
	gridModel: GridModel;

	constructor(gridModel: GridModel) {
		super();

		this.gridModel = gridModel;
	}

	process(x: number, y: number): void {
		this.gridModel.setTarget(x, y);
	}
}
