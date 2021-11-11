import {IPathfindable, PathfindingResult, PathfindingTile} from "../Pathfinding"
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

        let referenceTiles:any[][] = grid.getTiles();

        //Initialize a customized 'copy' of the original tiles, to store specific data 
        //which is used to efficiently process the pathfinding algorithm
        let tiles:PathfindingTile[][] = new Array(referenceTiles.length);

        for(let i=0;i<referenceTiles.length;i++)
        {
            let row:PathfindingTile[] = new Array(referenceTiles[i].length);
            for(let j=0;j<referenceTiles[i].length;j++)
            {
                row[j] = new PathfindingTile(i, j);
            }
            tiles[i] = row;
        }

        queue.push(tiles[start.x][start.y]);

        //Add the start node to visited, because no link should be set to that node
        visitedNodes.push(tiles[start.x][start.y]);
        tiles[start.x][start.y].visited = true;

        while(queue.length>0)
        {
            //Use first node in queue
            let activeNode = queue.shift();          

            //find neighbors of active node
            const neighbors:any[] = grid.getNeighboringTiles(activeNode);

            //add neighbors to queue, but only if not processed before
            for(let i=0;i<neighbors.length;i++)
            {
                let neighbor = tiles[neighbors[i].x][neighbors[i].y];

                if(neighbor.x === target.x && neighbor.y === target.y) 
                {
                    //stop searching
                    let path = this.constructPath(activeNode);
                    
                    return {path:path, visitedNodes:visitedNodes};
                }                

                if(!neighbor.visited)
                {
                    visitedNodes.push(neighbor);
                    neighbor.visited = true;

                    //add to queue
                    queue.push(neighbor);

                    //store the connected node
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