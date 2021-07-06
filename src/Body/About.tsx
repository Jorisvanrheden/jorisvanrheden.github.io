import "./Home.css"
import "./About.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import NavigationGrid from "../Components/NavigationGrid/NavigationGrid"

//Logic imports
import {AStar, Dijkstra, IPathfindable} from "../Logic/Pathfinding/Pathfinding";
import Grid from "../Logic/Pathfinding/Grid";

export default function About()
{
  const pathTypes:IPathfindable[] = [new AStar(), new Dijkstra()];

  function setType(index:number)
  {
    console.log(pathTypes[index]);
  }

  return(
    <div className="WebsiteMainContainer"   
    >
      <NavigationBar/>
      <NavigationGrid grid={new Grid(10,10)} pathTypes={pathTypes} setType={setType}/>
    </div>
  )  
}