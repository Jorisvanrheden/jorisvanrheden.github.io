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

    constructPath(target:any)
    {
        let path:any[] = [];
        
        let activeNode = target;

        while(activeNode.link != null)
        {
            path.push(activeNode);

            activeNode = activeNode.link;
        }

        //remove target from list
        if(path.length>0)path.splice(0,1);

        return path.reverse();
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
                if(!this.collectionContains(visitedNodes, neighbors[i]))
                {
                    if(neighbors[i].x === target.x &&
                       neighbors[i].y === target.y) return visitedNodes;

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

    calculatePath(grid:Grid, start:any, target:any): any {
        //Depth first search
        const visitedNodes:any[] = this.process(grid, start, target);
        const path = this.constructPath(target);

        const output = {visitedNodes: visitedNodes, path: path};
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

    calculatePath(grid:Grid, start:any, target:any): any {
        const visitedNodes:any[] = this.process(grid, start, target);
        const path = this.constructPath(target);

        const output = {visitedNodes: visitedNodes, path: path};
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

