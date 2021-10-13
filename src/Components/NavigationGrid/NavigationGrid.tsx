import "../NavigationGrid/NavigationGrid.css";

import { useState } from "react";

//Logic imports
import GridNode from "../GridNode/GridNode";

import { GridModel } from "../../Logic/Pathfinding/GridModel";

interface Props
{
  gridModel:GridModel;
}

let isMouseDown = false;

document.body.onmousedown = function() { 
  isMouseDown = true;
}
document.body.onmouseup = function() { 
  isMouseDown = false;
}

export default function NavigationGrid(props:Props) {
  const [tiles, setTiles] = useState(props.gridModel.grid.getTiles());
  
  props.gridModel.attachObserver(setTiles);
  // props.gridModel.attachPathObserver(display);

  function display(data:any)
  {
    //Clean the animation statuses in the current grid
    // props.grid.resetStatuses();
    // setTiles(props.grid.getTiles());                    

    //Draw searched paths
    // for(let i=0;i<data.visitedNodes.length;i++)
    // {
    //   setTimeout(() => {
    //     props.grid.setVisited(data.visitedNodes[i].x, data.visitedNodes[i].y);
    //     setTiles(props.grid.getTiles());                    
    //   }, i*50);
    // }

    //Draw determined paths
    // for(let i=0;i<data.path.length;i++)
    // {
    //   setTimeout(() => {
    //     props.gridModel.grid.setPath(data.path[i].x, data.path[i].y);
    //     setTiles(props.gridModel.grid.getTiles());                    
    //   }, i*50);
    // }
  }

  function handleMouseDown(x:number, y:number)
  {
    props.gridModel.processAction(x, y);
  }

  function handleMouseEnter(x:number, y:number)
  {
    if(!isMouseDown) return;

    props.gridModel.processAction(x, y);
  }

  function getStatus(x:number, y:number)
  {
    if(props.gridModel.start.x === x && props.gridModel.start.y === y) return 1;
    if(props.gridModel.target.x === x && props.gridModel.target.y === y) return 2;
    
    for(let i=0; i<props.gridModel.path.length;i++)
    {
      if(props.gridModel.path[i].x == x && props.gridModel.path[i].y == y) return 4;
    }
    
    return 0;
  }

  return (
    <div className="table-container">
        <table className="table">      
          {tiles.map((row: any[], xIndex: number) => (
            <tr>
              {row.map((item: any, yIndex: number) => (
                <td>
                  <GridNode
                      x={xIndex}
                      y={yIndex}

                      walkable={item.walkable}
                      status={getStatus(xIndex, yIndex)}

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