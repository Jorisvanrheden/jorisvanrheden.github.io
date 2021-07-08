import Grid from "../Pathfinding/Grid"

export abstract class IAction
{
  abstract process(x:number, y:number):void;
}

export class DefaultAction extends IAction
{
  process(x:number, y:number): void {
  }
}

export class ToggleAction extends IAction
{
  grid:Grid;
  callback:(grid:any) => void;

  constructor(grid:Grid, callback:any)
  {
    super();

    this.grid = grid;
    this.callback = callback;
  }

  process(x:number, y:number): void {
    this.grid.toggleWalkable(x,y);

    this.callback(this.grid.getTiles());
  }
}

export class StartAction extends IAction
{
  grid:Grid;
  callback:(grid:any) => void;
  set:(value:any) => void;

  constructor(grid:Grid, callback:any, set:any)
  {
    super();

    this.grid = grid;
    this.callback = callback;
    this.set = set;
  }

  process(x:number, y:number): void {
    this.grid.setStart(x,y);
    this.set({x, y});
    this.callback(this.grid.getTiles());
  }
}

export class TargetAction extends IAction
{
  grid:Grid;
  callback:(grid:any) => void;
  set:(value:any) => void;

  constructor(grid:Grid, callback:any, set:any)
  {
    super();

    this.grid = grid;
    this.callback = callback;
    this.set = set;
  }

  process(x:number, y:number): void {
    this.grid.setTarget(x,y);
    this.set({x, y});
    this.callback(this.grid.getTiles());
  }
}

export class CalculateAction extends IAction
{
  grid:Grid;
  callback:(grid:any) => void;

  constructor(grid:Grid, callback:any)
  {
    super();

    this.grid = grid;
    this.callback = callback;
  }

  process(x:number, y:number): void {
    this.grid.setTarget(x,y);

    this.callback(this.grid.getTiles());
  }
}