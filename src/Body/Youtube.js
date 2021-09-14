import "./Home.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import ProjectContainer from '../Components/ProjectContainer/ProjectContainer'

export default function Youtube() {
  return (
  <div className="WebsiteMainContainer">
    <NavigationBar/>
    <ProjectContainer/>
  </div>
  );
}