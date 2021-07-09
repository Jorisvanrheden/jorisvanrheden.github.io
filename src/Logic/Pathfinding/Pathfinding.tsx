import Grid from "../Pathfinding/Grid"

export abstract class IPathfindable
{
    abstract getName():string;
    abstract calculatePath(grid:Grid, start:any, target:any):any;

    collectionContains(collection:any[], item:any)
    {
        for(let i=0;i<collection.length;i++)
        {
            if(collection[i].x === item.x &&
               collection[i].y === item.y) return true;
        }
        return false;
    }
}

export class AStar extends IPathfindable
{
    getName(): string {
        return "AStar"
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
                   neighbors[i].y === target.y) return visitedNodes;

                if(grid.getStatus(neighbors[i].x, neighbors[i].y) !== 0) continue;                
                
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

    calculatePath(grid:Grid, start:any, target:any): any {
        console.log("Astar algo");

        //Depth first search
        //const visitedNodes:any[] = this.dfs(grid, start, target);

        //Breadth first search
        const visitedNodes:any[] = this.process(grid, start, target);


        const output = {visitedNodes: visitedNodes};
        return output;
    }    
}

export class DFS extends IPathfindable
{
    getName(): string {
        return "DFS"
    }

    process(grid:Grid, start:any, target:any)
    {
        // const neighbors:any[] = grid.getNeighboringTiles(start);

        // for(let i=0;i<neighbors.length;i++)
        // {
        //     //Check if default tile
        //     if(grid.getStatus(neighbors[i].x, neighbors[i].y) === 0)
        //     {
        //         //Only add to visited if not already included
        //         if(!this.collectionContains(visitedNodes, neighbors[i]))
        //         {
        //             visitedNodes.push(neighbors[i]);
        //         }
        //     }
        // }

        return [];
    }

    calculatePath(grid:Grid, start:any, target:any): any {
        //Depth first search
        const visitedNodes:any[] = this.process(grid, start, target);

        const output = {visitedNodes: visitedNodes};
        return output;
    }    
}

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
                   neighbors[i].y === target.y) return visitedNodes;

                if(grid.getStatus(neighbors[i].x, neighbors[i].y) !== 0) continue;                
                
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

    calculatePath(grid:Grid, start:any, target:any): any {
        const visitedNodes:any[] = this.process(grid, start, target);

        const output = {visitedNodes: visitedNodes};
        return output;
    }    
}

export class Dijkstra extends IPathfindable
{
    getName(): string {
        return "Dijkstra"
    }
    calculatePath(grid:Grid, start:any, target:any): any {
        console.log("Dijkstra algo");
    }    
}