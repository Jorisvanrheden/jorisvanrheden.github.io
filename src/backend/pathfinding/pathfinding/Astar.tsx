import { PathfindingStrategy, PathfindingResult } from "./Pathfinder";
import GridModel from "../grid/GridModel";
import { Node } from "./Node";

class PathfindingAStartTile extends Node {
	fScore: number = Infinity;
	gScore: number = Infinity;

	isInOpen: boolean = false;
	isInClosed: boolean = false;

	constructor(x: number, y: number) {
		super(x, y);
	}
}

export class AStar extends PathfindingStrategy {
	calculateHeuristic(start: any, target: any) {
		return Math.abs(target.y - start.y) + Math.abs(target.x - start.x);
	}

	getLowestFScoreIndex(openSet: PathfindingAStartTile[]) {
		let lowestIndex: number = 0;
		let lowestFScore: number = Infinity;

		for (let i = 0; i < openSet.length; i++) {
			let node = openSet[i];
			let fScore: any = node.fScore;

			if (fScore < lowestFScore) {
				lowestFScore = fScore;
				lowestIndex = i;
			}
		}

		return lowestIndex;
	}

	process(grid: GridModel, start: any, target: any) {
		//Initialize the open and closed sets
		let openSet: PathfindingAStartTile[] = [];
		let closedSet: PathfindingAStartTile[] = [];

		let referenceTiles: any[][] = grid.getTiles();

		//Initialize a customized 'copy' of the original tiles, to store specific data
		//which is used to efficiently process the pathfinding algorithm
		let tiles: PathfindingAStartTile[][] = new Array(referenceTiles.length);

		for (let i = 0; i < referenceTiles.length; i++) {
			let row: PathfindingAStartTile[] = new Array(referenceTiles[i].length);
			for (let j = 0; j < referenceTiles[i].length; j++) {
				row[j] = new PathfindingAStartTile(i, j);
			}
			tiles[i] = row;
		}

		//Add the start node to the open set
		openSet.push(tiles[start.x][start.y]);
		tiles[start.x][start.y].isInOpen = true;

		//Set the initial start heurisitc
		tiles[start.x][start.y].fScore = this.calculateHeuristic(start, target);
		tiles[start.x][start.y].gScore = 0;

		while (openSet.length > 0) {
			//Select a new active node, which is the node with the lowest fScore
			let activeNodeIndex = this.getLowestFScoreIndex(openSet);
			let activeNode = openSet[activeNodeIndex];

			//Remove the activenode from the open set
			openSet.splice(activeNodeIndex, 1);

			//Add the activenode to the closed set
			closedSet.push(activeNode);
			activeNode.isInClosed = true;

			if (activeNode.x === target.x && activeNode.y === target.y) {
				//stop searching
				let path = this.constructPath(activeNode);

				return { path: path, visitedNodes: closedSet };
			}

			//Go through all neighbors of the active node
			const neighbors: any[] = grid.getNeighboringTiles(activeNode);

			//Cache the active nodes GScore
			let activeGScore: any = activeNode.gScore;

			//add neighbors to queue, but only if not processed before
			for (let i = 0; i < neighbors.length; i++) {
				let neighbor = tiles[neighbors[i].x][neighbors[i].y];

				//Don't process neighbors that are in the closed list
				if (neighbor.isInClosed) continue;

				let neighborGScore: number =
					activeGScore + this.calculateHeuristic(activeNode, neighbor);
				let neighborFScore: number =
					neighborGScore + this.calculateHeuristic(neighbor, target);

				//Update the link
				neighbor.link = activeNode;

				if (neighbor.isInOpen) {
					let neighborOldGScore: any = neighbor.gScore;
					if (neighborGScore > neighborOldGScore) {
						continue;
					}
				} else {
					neighbor.gScore = neighborGScore;
					neighbor.fScore = neighborFScore;

					openSet.push(neighbor);
					neighbor.isInOpen = true;
				}
			}
		}
		return { path: [], visitedNodes: [] };
	}

	calculatePath(grid: GridModel, start: any, target: any): PathfindingResult {
		const data: any = this.process(grid, start, target);

		return { path: data.path, visitedNodes: data.visitedNodes };
	}
}
