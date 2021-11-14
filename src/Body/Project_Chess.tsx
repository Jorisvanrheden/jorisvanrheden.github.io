import "./Home.css"

//component imports
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Footer from '../Components/Footer/Footer'

export default function Project_Chess()
{  
  return(
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>
      <div id="main">
        This is where the CHESS stuff should come   
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  )  
}