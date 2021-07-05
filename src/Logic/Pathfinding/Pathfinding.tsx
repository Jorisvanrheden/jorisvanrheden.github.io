export abstract class IPathfindable
{
    abstract getName():string;
    abstract calculatePath():void;
}

export class AStar extends IPathfindable
{
    getName(): string {
        return "AStar"
    }
    calculatePath(): void {
        console.log("Astar algo");
    }    
}

export class Dijkstra extends IPathfindable
{
    getName(): string {
        return "Dijkstra"
    }
    calculatePath(): void {
        console.log("Dijkstra algo");
    }    
}

export default class Pathfinder
{
    getName(){};
    
    calculatePath(pathfinder:IPathfindable)
    {
        pathfinder.calculatePath();
    }
}