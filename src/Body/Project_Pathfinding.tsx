import "./Home.css"

//component imports
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Footer from '../Components/Footer/Footer'

import GridProject from "../Components/GridProject/GridProject"

export default function Project_Pathfinding()
{  
  return(
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>
      <div id="main">
        <GridProject/>      
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  )  
}