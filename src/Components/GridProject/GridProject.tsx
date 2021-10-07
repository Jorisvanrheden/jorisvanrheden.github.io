import "./GridProject.css"

import Toolbar from "../../Components/Toolbar/Toolbar"
import GridEnvironment from "../../Components/GridEnvironment/GridEnvironment"

//Logic imports
import {DFS, BFS, AStar, Dijkstra, IPathfindable} from "../../Logic/Pathfinding/Pathfinding";
import { ToolbarItemInput } from "../../Components/Toolbar/Toolbar";

const pathTypes:IPathfindable[] = [new BFS(), new DFS(), new AStar(), new Dijkstra()];

function generateToolbarItemInput_Pathfinding(onIndexChanged:(index:number)=>void):ToolbarItemInput
{
    let names:string[] = [];
    for(let i = 0; i< pathTypes.length;i++)
    {
        names.push(pathTypes[i].getName());
    }   
    return new ToolbarItemInput("Pathfinding", names, 0, onIndexChanged);
}

function generateToolbarItemInput_ActionTypes(onIndexChanged:(index:number)=>void):ToolbarItemInput
{
    let names:string[] = ["Toggle", "Set Start", "Set Target"];
    return new ToolbarItemInput("Action", names, 0, onIndexChanged);
}

function generateToolbarItemInput_SingleActions(onIndexChanged:(index:number)=>void):ToolbarItemInput
{
    let names:string[] = ["Clear", "Randomize", "Calculate"];
    return new ToolbarItemInput("Single actions", names, 0, onIndexChanged);
}

export default function GridProject()
{
    let inputItems:ToolbarItemInput[] = [];

    inputItems.push(generateToolbarItemInput_Pathfinding(setPathfindIndex));
    inputItems.push(generateToolbarItemInput_ActionTypes(setActionTypeIndex));
    inputItems.push(generateToolbarItemInput_SingleActions(setSingleActionIndex));

    function setPathfindIndex(index:number)
    {
        console.log(index);
    }
    function setActionTypeIndex(index:number)
    {
        console.log(index);
    }
    function setSingleActionIndex(index:number)
    {
        console.log(index);
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
                <GridEnvironment/>
            </div>
        </div>
    )
}