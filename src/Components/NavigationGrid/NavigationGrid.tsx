import "../NavigationGrid/NavigationGrid.css";
import GridNode from "../GridNode/GridNode";

import { useState } from "react";

//Logic imports
import {IPathfindable} from "../../Logic/Pathfinding/Pathfinding";

interface Props
{
  pathTypes:IPathfindable[];

  setType:(index:number) => void;
}

let isMouseDown = false;

document.body.onmousedown = function() { 
  isMouseDown = true;
}
document.body.onmouseup = function() { 
  isMouseDown = false;
}

export default function NavigationGrid(props:Props) {
  const [tiles, setTiles] = useState(initializeGrid());

  function initializeGrid() 
  {
    const grid:any = [];

    for(let i=0;i<10;i++)
    {
        const row:any = [];
        for(let j=0;j<20;j++)
        {
            const gridNode:any = {x:i, y:j, walkable:true};
            row.push(gridNode);
        }

        grid.push(row);
    }

    return grid;
  }

  function toggleNodeGridStatus(x:number, y:number)
  {
    const gridCopy = tiles.slice();

    const node = gridCopy[x][y];
    const updatedNode = {...node, walkable:!node.walkable};

    gridCopy[x][y] = updatedNode;
    
    setTiles(gridCopy);
  }

  function handleMouseDown(x:number, y:number)
  {
    toggleNodeGridStatus(x,y);
  }

  function handleMouseEnter(x:number, y:number)
  {
    if(!isMouseDown) return;

    toggleNodeGridStatus(x,y);
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

      {/* <button onClick={()=>pathfinder.calculatePath(activeMethod)}>
          Calculate?!
      </button> */}

      <table className="table"
      >
      
        {tiles.map((row: any[], xIndex: number) => (
          <tr>
            {row.map((item: any, yIndex: number) => (
              <td>
                <GridNode
                    x={xIndex}
                    y={yIndex}

                    walkable={item.walkable}

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
