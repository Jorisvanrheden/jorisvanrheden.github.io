import "./Home.css"

//component imports
import NavigationBar from "../Components/NavigationBar/NavigationBar"
import Footer from '../Components/Footer/Footer'
import ChessProject from "../Components/ChessProject/ChessProject"

import ChessModel from "../Logic/Chess/ChessModel"

export default function Project_Chess()
{  
  let chessModel:ChessModel = new ChessModel();

  return(
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>
      <div id="main">
        <ChessProject model={chessModel}/>
      </div>
      <div id="footer">
        <Footer/>
      </div>
    </div>
  )  
}