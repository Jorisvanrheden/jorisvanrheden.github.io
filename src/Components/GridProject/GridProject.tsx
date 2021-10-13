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
    return new ToolbarItemInput("Single actions", names, 0, onIndexChanged);
}

export default function GridProject()
{
    let gridModel:GridModel = new GridModel();

    let inputItems:ToolbarItemInput[] = [];

    let defaultPathfindTypeIndex:number = 0;
    let defaultActionTypeIndex:number = 0;

    inputItems.push(generateToolbarItemInput_Pathfinding(defaultPathfindTypeIndex, setPathfindIndex));
    inputItems.push(generateToolbarItemInput_ActionTypes(defaultActionTypeIndex, setActionTypeIndex));
    inputItems.push(generateToolbarItemInput_SingleActions(setSingleActionIndex));

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

        //It should trigger the GridModel functionality now
        //In this case if it randomizes:
        //- model performs grid randomize
        //- model also notifies observers of grid change
        //- done then right? Should be pretty doable
    }

    return(
        <div className="grid-container">

            {/* Things we need:
            - callback functions:
                - pathfind type setting
                - active action
                - one click events */}



            <div id="control-panel">
                <Toolbar itemGroups={inputItems}/>
            </div>
            <div id="display">
                <NavigationGrid gridModel={gridModel}/>
            </div>
        </div>
    )
}