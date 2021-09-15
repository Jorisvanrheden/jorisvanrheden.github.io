import {useState} from 'react'

//component imports
import NavigationGrid from "../../Components/NavigationGrid/NavigationGrid"

//Logic imports
import {DFS, BFS, AStar, Dijkstra, IPathfindable} from "../../Logic/Pathfinding/Pathfinding";
import Grid from "../../Logic/Pathfinding/Grid";

const grid:Grid = new Grid(15, 15);

export default function GridEnvironment()
{
  const pathTypes:IPathfindable[] = [new BFS(), new DFS(), new AStar(), new Dijkstra()];
  
  const [index, setIndex] = useState(0);

  function setType(index:number)
  {
    setIndex(index);
  }

  function calculate(grid:Grid, start:any, target:any)
  {
    return pathTypes[index].calculatePath(grid, start, target);
  }

  return(
    <div>
      <NavigationGrid 
      grid={grid} 
      pathTypes={pathTypes} 
      activeType={index}
      setType={setType}
      calculate={calculate}/>
    </div>
  )  
}