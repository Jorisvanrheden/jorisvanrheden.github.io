import "./Home.css"
import "./About.css"

import Grid, {Tile} from "../Logic/Pathfinding/Pathfinding"

import React, { useState } from 'react';

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'

const gridCache:Grid = new Grid(10,10);

export default function About() {
  
  const [grid, setGrid] = useState<Grid>(gridCache);

  function getCellStyle(tile:Tile)
  {
    if(tile.walkable) return "cell";
    else return "cell-dark";
  }

  function onCellInteraction(grid:Grid, xIndex:number, yIndex:number)
  {
    grid.values[xIndex][yIndex].walkable = !grid.values[xIndex][yIndex].walkable;

    setGrid(grid);
  }

  return (
  <div className="WebsiteMainContainer">
    <NavigationBar/>

    <table className="table">
    {
      grid.values.map((row:Tile[], xIndex:number) => (
        <tr>
          {
            row.map((tile:Tile, yIndex:number) => (
              <td className={getCellStyle(tile)} onClick={()=>onCellInteraction(grid, xIndex, yIndex)}></td>           
              ))
          }
        </tr>   
      ))
    }
    </table>
  </div>
  );
}