import "./Home.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import ProjectContainer from '../Components/ProjectContainer/ProjectContainer'
import Footer from '../Components/Footer/Footer'

export default function Youtube() {
  return (
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>
      <div id="main">
        <ProjectContainer/>
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  );
}