import Grid from "../Pathfinding/Grid"

export abstract class IPathfindable
{
    abstract getName():string;
    abstract calculatePath(grid:Grid, start:any, target:any):void;
}

export class AStar extends IPathfindable
{
    getName(): string {
        return "AStar"
    }

    recurse(grid:Grid, start:any, n:number)
    {
        const neighbors:any[] = grid.getNeighboringTiles(start);

        for(let i=0;i<neighbors.length;i++)
        {
            grid.addVisitedNode(neighbors[i]);

            if(n>0)
            {
                this.recurse(grid, neighbors[i], n-1);
            }
        }
    }

    calculatePath(grid:Grid, start:any, target:any): void {
        console.log("Astar algo");

        let iterations = 10;

        this.recurse(grid, start, iterations);
    }    
}

export class Dijkstra extends IPathfindable
{
    getName(): string {
        return "Dijkstra"
    }
    calculatePath(grid:Grid, start:any, target:any): void {
        console.log("Dijkstra algo");
    }    
}