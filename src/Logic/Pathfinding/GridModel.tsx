import Grid from "./Grid"
import {BFS, AStar, IPathfindable} from "../../Logic/Pathfinding/Pathfinding";
import {IAction, WalkableAction, DefaultAction, ToggleAction, StartAction, TargetAction} from "../../Logic/Pathfinding/Action";
import {IAnimator, InstantAnimator, StepByStepAnimator} from "../../Logic/Pathfinding/Animation"

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
    grid:Grid = new Grid(20,30);

    pathTypes:IPathfindable[] = [new BFS(), new AStar()];
    activePathIndex:number = 0;

    activeAction:IAction = new DefaultAction();
    activeAnimation:IAnimator = new InstantAnimator();

    start:Coordinate = new Coordinate(-1, -1);
    target:Coordinate = new Coordinate(-1, -1);

    path:Coordinate[] = [];

    observers:any[] = [];

    calculateOnChange:boolean = true;

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
                this.activeAction = new WalkableAction(this, true);
                break;
            case 1:
                this.activeAction = new WalkableAction(this, false);
                break;
            case 2:
                this.activeAction = new ToggleAction(this);
                break;
            case 3:
                this.activeAction = new StartAction(this);
                break;
            case 4:
                this.activeAction = new TargetAction(this);
        }
    }

    setEnableAnimation(enableAnimation:boolean)
    {
        if(enableAnimation)
        {
            this.activeAnimation = new StepByStepAnimator();
        }
        else
        {
            this.activeAnimation = new InstantAnimator();
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

        this.processChange();
    }

    randomizeGrid()
    {
        this.grid.randomize();

        this.processChange();
    }

    calculatePath()
    {
        let data = this.pathTypes[this.activePathIndex].calculatePath(this.grid, this.start, this.target);   
        
        //Cancel the previous animation if one was being executed
        this.activeAnimation.stop();
        
        //Trigger the new animation 
        this.activeAnimation.animate(data.path, this);

        this.notifyObservers();
    }

    displayPath(path:any)
    {
        this.path = path;

        this.notifyObservers();
    }

    toggleWalkable(x:number, y:number)
    {
        this.grid.toggleWalkable(x,y);

        this.processChange();
    }
    
    setWalkable(x:number, y:number, walkable:boolean)
    {
        this.grid.setWalkable(x, y, walkable);

        this.processChange();
    }

    setStart(x:number, y:number)
    {
        this.start = new Coordinate(x, y);

        this.processChange();
    }

    setTarget(x:number, y:number)
    {
        this.target = new Coordinate(x, y);

        this.processChange();
    }

    processChange()
    {
        //Only recalculate the path if the setting explicity mentions it
        if(this.calculateOnChange)  
        {
            this.calculatePath();
        }
        else
        {
            //clean the path
            this.path = [];

            this.activeAnimation.stop();

            this.notifyObservers();
        }
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