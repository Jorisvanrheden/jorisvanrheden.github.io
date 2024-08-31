import { GridManager } from "../../backend/pathfinding/grid/GridManager";
import GridCell, { GRID_STATUS } from "./GridCell";
import "./Grid.css"

import { useState } from "react";

type Props = {
	gridManager: GridManager;
};

let isMouseDown = false;

document.body.onmousedown = function () {
	isMouseDown = true;
};
document.body.onmouseup = function () {
	isMouseDown = false;
};

export default function Grid({gridManager}: Props) {
	const [tiles, setTiles] = useState(gridManager.grid.getTiles());

	gridManager.attachObserver(setTiles);

	function handleMouseDown(x: number, y: number) {
		gridManager.processAction(x, y);
	}

	function handleMouseEnter(x: number, y: number) {
		if (!isMouseDown) return;

		gridManager.processAction(x, y);
	}

	function getStatus(x: number, y: number) {
		const { start, target, path, visitedNodes } = gridManager;

		const pathSet = new Set(path.map(node => `${node.x}-${node.y}`));
		const visitedNodesSet = new Set(visitedNodes.map(node => `${node.x}-${node.y}`));
	
		// Check the start and target positions
		if (start.x === x && start.y === y) return GRID_STATUS.START;
		if (target.x === x && target.y === y) return GRID_STATUS.TARGET;

		// Check if (x, y) is in the path or visitedNodes
		const key = `${x}-${y}`;
		if (pathSet.has(key)) return GRID_STATUS.PATH;
		if (visitedNodesSet.has(key)) return GRID_STATUS.VISITED;
	
		return GRID_STATUS.DEFAULT;
	}

	return (
		<div className="grid">
			{tiles.map((row: any[]) => (
				<div className="grid-row">
					{row.map((item: any) => (
						<div className="grid-cell">
							<GridCell
								x={item.x}
								y={item.y}
								walkable={item.walkable}
								status={getStatus(item.x, item.y)}
								processMouseClick={handleMouseDown}
								processMouseEnter={handleMouseEnter}
							/>
						</div>
					))}
				</div>
			))}
		</div>
	);
}
