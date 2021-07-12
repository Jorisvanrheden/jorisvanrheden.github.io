import "./Home.css"
import "./About.css"

import {useState} from 'react'

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import NavigationGrid from "../Components/NavigationGrid/NavigationGrid"

//Logic imports
import {DFS, BFS, AStar, Dijkstra, IPathfindable} from "../Logic/Pathfinding/Pathfinding";
import Grid from "../Logic/Pathfinding/Grid";

const grid:Grid = new Grid(30,30);

export default function About()
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
    <div className="WebsiteMainContainer"   
    >
      <NavigationBar/>
      <NavigationGrid 
      grid={grid} 
      pathTypes={pathTypes} 
      activeType={index}
      setType={setType}
      calculate={calculate}/>
    </div>
  )  
}