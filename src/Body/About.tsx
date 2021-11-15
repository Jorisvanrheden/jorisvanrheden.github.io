import "./Home.css"

//component imports
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Footer from '../Components/Footer/Footer'

import ChessProject from "../Components/ChessProject/ChessProject"

export default function About()
{  
  return(
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>
      <div id="main">
        stuff for about  
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  )  
}