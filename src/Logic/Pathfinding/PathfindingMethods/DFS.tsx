import {IPathfindable, PathfindingResult} from "../Pathfinding"
import Grid from "../../Pathfinding/Grid"

export class DFS extends IPathfindable
{
    getName(): string {
        return "DFS"
    }

    recurse(visitedNodes:any[], grid:Grid, activeNode:any, target:any):Boolean
    {
        //find neighbors of active node
        const neighbors:any[] = grid.getNeighboringTiles(activeNode);
        for(let i=0;i<neighbors.length;i++)
        {
            //if the target is found, return
            if(neighbors[i].x === target.x &&
               neighbors[i].y === target.y)
            {
                target.link = activeNode;
                return true;
            } 
            
            //store the connected node
            neighbors[i].link = activeNode;
            
            if(!this.collectionContains(visitedNodes, neighbors[i]))
            {
                //add the active node to the visited nodes list
                visitedNodes.push(neighbors[i]);

                const foundTarget = this.recurse(visitedNodes, grid, neighbors[i], target);

                //stop searching only if the target has been found
                if(foundTarget) return foundTarget;
            }        
        }

        return false;
    }

    process(grid:Grid, start:any, target:any)
    {
        let visitedNodes:any[] = [];
        
        let foundTarget:Boolean = this.recurse(visitedNodes, grid, start, target);

        return visitedNodes;
    }

    calculatePath(grid:Grid, start:any, target:any): PathfindingResult {
        const visitedNodes:any[] = this.process(grid, start, target);
        const path:any[] = [];// = this.constructPath(target);
        
        return {path: path, visitedNodes: visitedNodes};
    } 
}