import { GridManager } from "../grid/GridManager";
import { IAction } from "./Action";

export class StartAction extends IAction {
	gridModel: GridManager;
	set: (value: any) => void;

	constructor(gridModel: GridManager) {
		super();

		this.gridModel = gridModel;
	}

	process(x: number, y: number): void {
		this.gridModel.setStart(x, y);
	}
}
