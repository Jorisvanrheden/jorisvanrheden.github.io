import "./Home.css"

//component imports
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Footer from '../Components/Footer/Footer'
import ProjectList from '../Components/ProjectList/ProjectList'
import {ProjectDataEntries} from "./../Logic/ProjectInformation/ProjectData"

export default function SoftwareProjects()
{  
  return(
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>
      <div id="main">
        <ProjectList entries={ProjectDataEntries}/>      
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  )  
}