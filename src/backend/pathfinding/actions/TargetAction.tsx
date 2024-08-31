import { GridManager } from "../grid/GridManager";
import { IAction } from "./Action";

export class TargetAction extends IAction {
	gridModel: GridManager;

	constructor(gridModel: GridManager) {
		super();

		this.gridModel = gridModel;
	}

	process(x: number, y: number): void {
		this.gridModel.setTarget(x, y);
	}
}
