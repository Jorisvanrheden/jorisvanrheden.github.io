import "./Home.css"

//component imports
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Footer from '../Components/Footer/Footer'
import MancalaProject from "../Components/MancalaProject/MancalaProject"

import MancalaModel from "../Logic/Mancala/MancalaModel"

export default function Project_Mancala()
{  
  let mancalaModel:MancalaModel = new MancalaModel();

  return(
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>
      <div id="main">
        <MancalaProject model={mancalaModel}/>
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  )  
}