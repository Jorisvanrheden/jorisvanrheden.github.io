import { GridModel } from "../../backend/pathfinding/grid/GridModel";
import GridNode, { GRID_STATUS } from "./GridNode";
import "./NavigationGrid.css";

import { useState } from "react";

interface Props {
	gridModel: GridModel;
}

let isMouseDown = false;

document.body.onmousedown = function () {
	isMouseDown = true;
};
document.body.onmouseup = function () {
	isMouseDown = false;
};

export default function NavigationGrid(props: Props) {
	const [tiles, setTiles] = useState(props.gridModel.grid.getTiles());

	props.gridModel.attachObserver(setTiles);

	function handleMouseDown(x: number, y: number) {
		props.gridModel.processAction(x, y);
	}

	function handleMouseEnter(x: number, y: number) {
		if (!isMouseDown) return;

		props.gridModel.processAction(x, y);
	}

	function getStatus(x: number, y: number) {
		if (props.gridModel.start.x === x && props.gridModel.start.y === y)
			return GRID_STATUS.START;
		if (props.gridModel.target.x === x && props.gridModel.target.y === y)
			return GRID_STATUS.TARGET;

		for (let i = 0; i < props.gridModel.path.length; i++) {
			if (props.gridModel.path[i].x === x && props.gridModel.path[i].y === y)
				return GRID_STATUS.PATH;
		}

		for (let i = 0; i < props.gridModel.visitedNodes.length; i++) {
			if (
				props.gridModel.visitedNodes[i].x === x &&
				props.gridModel.visitedNodes[i].y === y
			)
				return GRID_STATUS.VISITED;
		}

		return GRID_STATUS.DEFAULT;
	}

	return (
		<div className="table-container">
			<table className="table">
				{tiles.map((row: any[], xIndex: number) => (
					<tr>
						{row.map((item: any, yIndex: number) => (
							<td>
								<GridNode
									x={xIndex}
									y={yIndex}
									walkable={item.walkable}
									status={getStatus(xIndex, yIndex)}
									processMouseClick={handleMouseDown}
									processMouseEnter={handleMouseEnter}></GridNode>
							</td>
						))}
					</tr>
				))}
			</table>
		</div>
	);
}
