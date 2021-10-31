import Grid from "../Pathfinding/Grid"

export interface PathfindingResult
{
    path:any[];
    visitedNodes:any[];
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