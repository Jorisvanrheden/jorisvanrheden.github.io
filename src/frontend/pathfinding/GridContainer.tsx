import { GridManager } from "../../backend/pathfinding/grid/GridManager";
import Grid from "./Grid";
import Toolbar, { ToolbarItemInput } from "../toolbar/Toolbar";
import "./GridContainer.css"

function generateToolbarItemInput_Pathfinding(
	defaultIndex: number,
	onIndexChanged: (index: number) => void
): ToolbarItemInput {
	let names: string[] = ["BFS", "A-star(*)"];

	return new ToolbarItemInput(
		"Pathfinding",
		names,
		defaultIndex,
		onIndexChanged
	);
}

function generateToolbarItemInput_ActionTypes(
	defaultIndex: number,
	onIndexChanged: (index: number) => void
): ToolbarItemInput {
	let names: string[] = ["Walkable", "Non-walkable", "Set Start", "Set Target"];
	return new ToolbarItemInput(
		"Tile actions",
		names,
		defaultIndex,
		onIndexChanged
	);
}

function generateToolbarItemInput_SingleActions(
	onIndexChanged: (index: number) => void
): ToolbarItemInput {
	let names: string[] = ["Clear", "Randomize"];
	return new ToolbarItemInput("Grid actions", names, -1, onIndexChanged);
}

export default function GridContainer() {
	let gridManager: GridManager = new GridManager();

	let inputToggleItems: ToolbarItemInput[] = [];
	let inputButtonItems: ToolbarItemInput[] = [];

	let defaultPathfindTypeIndex: number = 0;
	let defaultActionTypeIndex: number = 2;

	inputToggleItems.push(
		generateToolbarItemInput_Pathfinding(
			defaultPathfindTypeIndex,
			setPathfindIndex
		)
	);
	inputToggleItems.push(
		generateToolbarItemInput_ActionTypes(
			defaultActionTypeIndex,
			setActionTypeIndex
		)
	);

	inputButtonItems.push(
		generateToolbarItemInput_SingleActions(setSingleActionIndex)
	);

	gridManager.setPathfindingIndex(defaultPathfindTypeIndex);
	gridManager.setActionIndex(defaultActionTypeIndex);

	function setPathfindIndex(index: number) {
		gridManager.setPathfindingIndex(index);
	}
	function setActionTypeIndex(index: number) {
		gridManager.setActionIndex(index);
	}
	function setSingleActionIndex(index: number) {
		switch (index) {
			case 0:
				gridManager.clearGrid();
				break;
			case 1:
				gridManager.randomizeGrid();
				break;
		}
	}

	function setAnimationEnabled(enabled: boolean) {
		gridManager.setEnableAnimation(enabled);
	}

	return (
		<div className="grid-container">
			<div id="control-panel">
				<Toolbar
					itemGroups={inputToggleItems}
					itemButtons={inputButtonItems}
					onCheckedChanged={setAnimationEnabled}
				/>
			</div>
			<div id="display">
				<Grid gridManager={gridManager} />
			</div>
		</div>
	);
}
