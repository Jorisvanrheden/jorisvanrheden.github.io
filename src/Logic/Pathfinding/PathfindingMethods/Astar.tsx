import {IPathfindable, PathfindingResult} from "../Pathfinding"
import Grid from "../../Pathfinding/Grid"
import Coordinate from "../Grid"

export class AStar extends IPathfindable
{
    getName(): string {
        return "AStar"
    }

    calculateHeuristic(start:any, target:any)
    {
        return Math.abs(target.y - start.y) + Math.abs(target.x - start.x);
    }

    getLowestFScoreIndex(openSet:any[], fScores:Map<any, number>, tiles:any[])
    {
        let lowestIndex:number = 0;
        let lowestFScore:number = Infinity;

        for(let i=0;i<openSet.length;i++)
        {
            let node = openSet[i];
            let fScore:any = fScores.get(tiles[node.x][node.y]);

            if(fScore < lowestFScore)
            {
                lowestFScore = fScore;
                lowestIndex = i;
            }
        }

        return lowestIndex;
    }

    process(grid:Grid, start:any, target:any)
    {
        //Initialize the open and closed sets
        let openSet:any[] = [];
        let closedSet:any[] = [];

        //Dictionaries to keep track of the g/f-scores
        let fScores = new Map<any, number>();
        let gScores = new Map<any, number>();

        let tiles:any[][] = grid.getTiles();

        //Initialize all f/g-scores to infinity
        for(let i=0;i<tiles.length;i++)
        {
            for(let j=0;j<tiles[i].length;j++)
            {
                fScores.set(tiles[i][j], Infinity);
                gScores.set(tiles[i][j], Infinity);
            }
        }

        //Add the start node to the open set
        openSet.push(tiles[start.x][start.y]);

        //Set the initial start heurisitc
        fScores.set(tiles[start.x][start.y], this.calculateHeuristic(start, target));
        gScores.set(tiles[start.x][start.y], 0);

        while(openSet.length > 0)
        {
            //Select a new active node, which is the node with the lowest fScore
            let activeNodeIndex = this.getLowestFScoreIndex(openSet, fScores, tiles);
            let activeNode = openSet[activeNodeIndex];

            //Remove the activenode from the open set
            openSet.splice(activeNodeIndex, 1);

            //Add the activenode to the closed set
            closedSet.push(activeNode);

            if(activeNode.x === target.x && activeNode.y === target.y)
            {
                //stop searching
                let path = this.constructPath(activeNode);
                
                return {path:path, visitedNodes:closedSet};
            }

            //Go through all neighbors of the active node
            const neighbors:any[] = grid.getNeighboringTiles(activeNode);

            //Cache the active nodes GScore
            let activeGScore:any = gScores.get(activeNode);

            //add neighbors to queue, but only if not processed before
            for(let i=0;i<neighbors.length;i++)
            {    
                let neighbor = tiles[neighbors[i].x][neighbors[i].y]

                //Don't process neighbors that are in the closed list
                if(this.collectionContains(closedSet, neighbor)) continue;

                let neighborGScore:number = activeGScore + this.calculateHeuristic(activeNode, neighbor);
                let neighborFScore:number = neighborGScore + this.calculateHeuristic(neighbor, target);

                if(this.collectionContains(openSet, neighbor))
                {
                    let neighborOldGScore:any = gScores.get(neighbor);
                    if(neighborGScore > neighborOldGScore)
                    {
                        continue;
                    }
                }
                else
                {
                    gScores.set(neighbor, neighborGScore);
                    fScores.set(neighbor, neighborFScore);

                    openSet.push(neighbor);

                    //Update the link
                    neighbor.link = activeNode;
                }
            }
        }
        return {path:[], visitedNodes:[]};
    } 

    calculatePath(grid:Grid, start:any, target:any): PathfindingResult {
        
        const data:any = this.process(grid, start, target);

        return {path: data.path, visitedNodes: data.visitedNodes};
    }
}