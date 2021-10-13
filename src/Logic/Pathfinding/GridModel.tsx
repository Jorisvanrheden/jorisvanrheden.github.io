import Grid from "./Grid"
import {DFS, BFS, AStar, Dijkstra, IPathfindable} from "../../Logic/Pathfinding/Pathfinding";
import {IAction, DefaultAction, ToggleAction, StartAction, TargetAction} from "../../Logic/Pathfinding/Action";

class Coordinate
{
    x:number;
    y:number;

    constructor(x:number, y:number)
    {
        this.x = x;
        this.y = y;
    }
}

export class GridModel
{
    grid:Grid = new Grid(20,20);

    pathTypes:IPathfindable[] = [new BFS(), new DFS(), new AStar(), new Dijkstra()];
    activePathIndex:number = 0;

    activeAction:IAction = new DefaultAction();

    start:Coordinate = new Coordinate(-1, -1);
    target:Coordinate = new Coordinate(-1, -1);

    path:Coordinate[] = [];

    observers:any[] = [];

    constructor()
    {

    }

    setPathfindingIndex(index:number)
    {
        if(index < 0 || index >= this.pathTypes.length) return;

        this.activePathIndex = index;
    }

    setActionIndex(index:number)
    {
        switch(index)
        {
            case 0:
                this.activeAction = new ToggleAction(this);
                break;
            case 1:
                this.activeAction = new StartAction(this);
                break;
            case 2:
                this.activeAction = new TargetAction(this);
        }
    }

    processAction(x:number, y:number)
    {
        this.activeAction.process(x, y);
    }

    setAction(action:IAction)
    {
        this.activeAction = action;
    }

    clearGrid()
    {
        this.grid.clear();

        this.notifyObservers();
    }

    randomizeGrid()
    {
        //this.grid.resetStatuses();
        this.grid.randomize();

        this.notifyObservers();
    }

    calculatePath()
    {
        let data = this.pathTypes[this.activePathIndex].calculatePath(this.grid, this.start, this.target);   
        
        this.path = [];
        this.path = data.path;
        this.notifyObservers();
        // for(let i=0;i<data.path.length;i++)
        // {
        //     setTimeout(() => 
        //     {
        //         this.path.push(data.path[i]);
        //         this.notifyObservers();                
        //     }, i*50);
        // }
    }

    toggleWalkable(x:number, y:number)
    {
        this.grid.toggleWalkable(x,y);
    
        this.notifyObservers();
    }

    setStart(x:number, y:number)
    {
        this.start = new Coordinate(x, y);
        this.calculatePath()

        this.notifyObservers();
    }

    setTarget(x:number, y:number)
    {
        this.target = new Coordinate(x, y);
        this.calculatePath();

        this.notifyObservers();
    }

    attachObserver(observer:any)
    {
        if(!this.observers.includes(observer))
        {
            this.observers.push(observer);
        }
    }

    notifyObservers()
    {
        let tiles = this.grid.getTiles();

        this.observers.forEach(callback => {
            callback(tiles);
        });
    }
}