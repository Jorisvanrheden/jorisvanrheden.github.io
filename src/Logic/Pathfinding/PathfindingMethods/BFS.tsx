import {IPathfindable, PathfindingResult} from "../Pathfinding"
import Grid from "../../Pathfinding/Grid"

export class BFS extends IPathfindable
{
    getName(): string {
        return "BFS"
    }

    process(grid:Grid, start:any, target:any)
    {
        let queue:any[] = [];
        let visitedNodes:any[] = [];

        queue.push(start);

        while(queue.length>0)
        {
            //Use first node in queue
            let activeNode = queue.shift();          

            //find neighbors of active node
            const neighbors:any[] = grid.getNeighboringTiles(activeNode);

            //add neighbors to queue, but only if not processed before
            for(let i=0;i<neighbors.length;i++)
            {
                if(neighbors[i].x === target.x &&
                   neighbors[i].y === target.y) 
                {
                    target.link = activeNode;
                    return visitedNodes;
                }

                //store the connected node
                neighbors[i].link = activeNode;

                if(!this.collectionContains(visitedNodes, neighbors[i]))
                {
                    visitedNodes.push(neighbors[i]);

                    //add to queue
                    queue.push(neighbors[i]);
                }        
            }
        }

        return visitedNodes;
    }

    calculatePath(grid:Grid, start:any, target:any): PathfindingResult {
        const visitedNodes:any[] = this.process(grid, start, target);
        const path:any[] = this.constructPath(target);

        return {path: path, visitedNodes: visitedNodes};
    }    
}