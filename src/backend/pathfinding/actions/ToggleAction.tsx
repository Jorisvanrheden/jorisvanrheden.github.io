import { GridManager } from "../grid/GridManager";
import { IAction } from "./Action";

export class ToggleAction extends IAction {
	gridModel: GridManager;
	callback: (grid: any) => void;

	constructor(gridModel: GridManager) {
		super();

		this.gridModel = gridModel;
	}

	process(x: number, y: number): void {
		this.gridModel.toggleWalkable(x, y);
	}
}
