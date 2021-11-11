import Grid from "../Pathfinding/Grid"

export interface PathfindingResult
{
    path:any[];
    visitedNodes:any[];
}

export class PathfindingTile
{
    //store the link to backtrack
    //this is more efficient than keeping track of another data structure   
    link:PathfindingTile;
 
    x:number;
    y:number;

    visited:boolean = false;

    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }
}

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

    constructPath(target:PathfindingTile)
    {
        let path:PathfindingTile[] = [];
        
        let activeNode = target;

        while(activeNode !== undefined)
        {
            path.push(activeNode);

            activeNode = activeNode.link;
        }

        return path.reverse();
    }
}