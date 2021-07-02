import "./Home.css"
import "./About.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import NavigationGrid from "../Components/NavigationGrid/NavigationGrid"

export default function About()
{
  return(
    <div className="WebsiteMainContainer">
      <NavigationBar/>
      <NavigationGrid/>
    </div>
  )  
}