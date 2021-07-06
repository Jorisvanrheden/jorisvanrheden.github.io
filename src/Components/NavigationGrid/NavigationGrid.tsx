import "../NavigationGrid/NavigationGrid.css";
import GridNode from "../GridNode/GridNode";

import { useState } from "react";

//Logic imports
import {IPathfindable} from "../../Logic/Pathfinding/Pathfinding";
import Grid from "../../Logic/Pathfinding/Grid";
import {IAction, DefaultAction, ToggleAction, StartAction} from "../../Logic/Pathfinding/Action";

interface Props
{
  grid:Grid;

  pathTypes:IPathfindable[];

  setType:(index:number) => void;
}



let activeAction:IAction = new DefaultAction();


let isMouseDown = false;

document.body.onmousedown = function() { 
  isMouseDown = true;
}
document.body.onmouseup = function() { 
  isMouseDown = false;
}

export default function NavigationGrid(props:Props) {
  const [tiles, setTiles] = useState(props.grid.getTiles());

  function callback(grid:any)
  {
    setTiles(grid);
  }

  function clearGrid()
  {
    props.grid.clear();
    setTiles(props.grid.getTiles());
  }

  function handleMouseDown(x:number, y:number)
  {
    activeAction.process(x, y);
  }

  function handleMouseEnter(x:number, y:number)
  {
    if(!isMouseDown) return;

    // toggleNodeGridStatus(x,y);
  }

  return (
    <div>
      <h1>Choose from the wonderful selection of pathfinding goodies</h1>
      <h3>Features:</h3>
      <ul>
        <li>multi-pathfinding algorithms</li>
        <li>overlay options</li>
        <li>step-by-step visualization</li>
        <li>animation speed regulations</li>
        <li>direct path calculation</li>
        <li>map editor</li>
      </ul> 
      {
        props.pathTypes.map((value:IPathfindable, index:number) => 
        (
          <button onClick={()=>props.setType(index)}>
            {value.getName()}
          </button>
        ))
      }

      <button onClick={()=>clearGrid()}>
          Clear grid
      </button>

      <button onClick={()=>activeAction = new ToggleAction(props.grid, callback)}>
          Toggle
      </button>

      <button onClick={()=>activeAction = new StartAction(props.grid, callback)}>
          Set Start
      </button>

      <table className="table">      
        {tiles.map((row: any[], xIndex: number) => (
          <tr>
            {row.map((item: any, yIndex: number) => (
              <td>
                <GridNode
                    x={xIndex}
                    y={yIndex}

                    walkable={item.walkable}
                    status={item.status}

                    processMouseClick={handleMouseDown}
                    processMouseEnter={handleMouseEnter}
                ></GridNode>      
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}