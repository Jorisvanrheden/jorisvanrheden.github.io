import "./Home.css"
import "./About.css"

import {useState} from 'react'

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import NavigationGrid from "../Components/NavigationGrid/NavigationGrid"

//Logic imports
import {AStar, Dijkstra, IPathfindable} from "../Logic/Pathfinding/Pathfinding";
import Grid from "../Logic/Pathfinding/Grid";

export default function About()
{
  const pathTypes:IPathfindable[] = [new AStar(), new Dijkstra()];
  
  const [index, setIndex] = useState(0);

  function setType(index:number)
  {
    setIndex(index);
  }

  function calculate(grid:Grid, start:any, target:any)
  {
    pathTypes[index].calculatePath(grid, start, target);
  }

  return(
    <div className="WebsiteMainContainer"   
    >
      <NavigationBar/>
      <NavigationGrid 
      grid={new Grid(10,10)} 
      pathTypes={pathTypes} 
      setType={setType}
      calculate={calculate}/>
    </div>
  )  
}