import "./Home.css"
import "./About.css"

//component imports
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Toolbar from "../Components/Toolbar/Toolbar"
import GridEnvironment from "../Components/GridEnvironment/GridEnvironment"

export default function About()
{  
  return(
    <div>
      <NavigationBar/>
      <div className="grid-project-body">
        <div className="grid-project-tile">
          <Toolbar/>
          <GridEnvironment/>
        </div>
      </div>
    </div>
  )  
}