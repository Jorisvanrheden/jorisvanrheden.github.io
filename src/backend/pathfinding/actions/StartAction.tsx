import { GridModel } from "../grid/GridModel";
import { IAction } from "./Action";

export class StartAction extends IAction {
	gridModel: GridModel;
	set: (value: any) => void;

	constructor(gridModel: GridModel) {
		super();

		this.gridModel = gridModel;
	}

	process(x: number, y: number): void {
		this.gridModel.setStart(x, y);
	}
}
