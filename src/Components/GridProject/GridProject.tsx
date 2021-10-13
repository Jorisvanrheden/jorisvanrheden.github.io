import "./GridProject.css"

import Toolbar from "../../Components/Toolbar/Toolbar"
import NavigationGrid from "../../Components/NavigationGrid/NavigationGrid"
import { GridModel } from "../../Logic/Pathfinding/GridModel"

//Logic imports
import {DFS, BFS, AStar, Dijkstra, IPathfindable} from "../../Logic/Pathfinding/Pathfinding";
import { ToolbarItemInput } from "../../Components/Toolbar/Toolbar";

const pathTypes:IPathfindable[] = [new BFS(), new DFS(), new AStar(), new Dijkstra()];

function generateToolbarItemInput_Pathfinding(defaultIndex:number, onIndexChanged:(index:number)=>void):ToolbarItemInput
{
    let names:string[] = [];
    for(let i = 0; i< pathTypes.length;i++)
    {
        names.push(pathTypes[i].getName());
    }   
    return new ToolbarItemInput("Pathfinding", names, defaultIndex, onIndexChanged);
}

function generateToolbarItemInput_ActionTypes(defaultIndex:number, onIndexChanged:(index:number)=>void):ToolbarItemInput
{
    let names:string[] = ["Toggle", "Set Start", "Set Target"];
    return new ToolbarItemInput("Action", names, defaultIndex, onIndexChanged);
}

function generateToolbarItemInput_SingleActions(onIndexChanged:(index:number)=>void):ToolbarItemInput
{
    let names:string[] = ["Clear", "Randomize", "Calculate"];
    return new ToolbarItemInput("Single actions", names, -1, onIndexChanged);
}

export default function GridProject()
{
    let gridModel:GridModel = new GridModel();

    let inputToggleItems:ToolbarItemInput[] = [];
    let inputButtonItems:ToolbarItemInput[] = [];

    let defaultPathfindTypeIndex:number = 0;
    let defaultActionTypeIndex:number = 0;

    inputToggleItems.push(generateToolbarItemInput_Pathfinding(defaultPathfindTypeIndex, setPathfindIndex));
    inputToggleItems.push(generateToolbarItemInput_ActionTypes(defaultActionTypeIndex, setActionTypeIndex));
    
    inputButtonItems.push(generateToolbarItemInput_SingleActions(setSingleActionIndex));

    gridModel.setPathfindingIndex(defaultPathfindTypeIndex);
    gridModel.setActionIndex(defaultActionTypeIndex);

    function setPathfindIndex(index:number)
    {
        gridModel.setPathfindingIndex(index);
    }
    function setActionTypeIndex(index:number)
    {
        gridModel.setActionIndex(index);
    }
    function setSingleActionIndex(index:number)
    {
        switch(index)
        {
            case 0:
                gridModel.clearGrid();
                break;
            case 1:
                gridModel.randomizeGrid();
                break;
            case 2:
                gridModel.calculatePath();
                break;
        }
    }

    return(
        <div className="grid-container">
            <div id="control-panel">
                <Toolbar 
                    itemGroups={inputToggleItems}
                    itemButtons={inputButtonItems}
                />
            </div>
            <div id="display">
                <NavigationGrid gridModel={gridModel}/>
            </div>
        </div>
    )
}