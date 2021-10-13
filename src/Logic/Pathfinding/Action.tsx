import Grid from "../Pathfinding/Grid"
import { GridModel } from "./GridModel";

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
  gridModel:GridModel;
  callback:(grid:any) => void;

  constructor(gridModel:GridModel)
  {
    super();

    this.gridModel = gridModel;
  }

  process(x:number, y:number): void {
    this.gridModel.toggleWalkable(x,y);
  }
}

export class StartAction extends IAction
{
  gridModel:GridModel;
  set:(value:any) => void;

  constructor(gridModel:GridModel)
  {
    super();

    this.gridModel = gridModel;
  }

  process(x:number, y:number): void {
    this.gridModel.setStart(x,y);
  }
}

export class TargetAction extends IAction
{
  gridModel:GridModel;

  constructor(gridModel:GridModel)
  {
    super();

    this.gridModel = gridModel;
  }

  process(x:number, y:number): void {
    this.gridModel.setTarget(x,y);
  }
}