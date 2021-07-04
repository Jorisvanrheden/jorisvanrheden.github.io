import "../NavigationGrid/NavigationGrid.css";

import Grid, { Tile } from "../../Logic/Pathfinding/Pathfinding";
import React, { useState, useEffect } from "react";

import GridNode from "../GridNode/GridNode";

export default function NavigationGrid() {
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

  function animateAllTest()
  {
    const gridCopy = tiles.slice();

    let index = 0;

    for(let i=0;i<gridCopy.length;i++)
    {
      const row = gridCopy[i];
      for(let j=0;j<row.length;j++)
      {
        setTimeout(() => {
          toggleNodeGridStatus(i,j);
        }, 50 * (index));

        index++;
      }
    }
  }

  function handleMouseDown(x:number, y:number)
  {
    toggleNodeGridStatus(x,y);
  }

  return (
    <div>
      <button onClick={()=>animateAllTest()}>
          Testing how this works
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

                    processMouseClick={handleMouseDown}
                ></GridNode>      
              </td>
            ))}
          </tr>
        ))}
      </table>
    </div>
  );
}
