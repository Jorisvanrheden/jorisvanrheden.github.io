import {useState} from 'react'

//component imports
import NavigationGrid from "../../Components/NavigationGrid/NavigationGrid"

//Logic imports
import Grid from "../../Logic/Pathfinding/Grid";

const grid:Grid = new Grid(15, 15);

export default function GridEnvironment()
{  
  const [index, setIndex] = useState(0);

  function setType(index:number)
  {
    setIndex(index);
  }

  function calculate(grid:Grid, start:any, target:any)
  {
    console.log("Calculate this thing");
    // return pathTypes[index].calculatePath(grid, start, target);
  }

  return(
    <NavigationGrid 
      grid={grid} 
      activeType={index}
      setType={setType}
      calculate={calculate}/>
  )  
}