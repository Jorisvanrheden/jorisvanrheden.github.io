import "./Home.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import Footer from '../Components/Footer/Footer'
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    // const script = document.createElement('script');
    // console.log("initt");

    // script.src = "https://use.typekit.net/foobar.js";
    // script.async = true;
  
    // document.body.appendChild(script);

  
    // // return () => {
    // //   document.body.removeChild(script);
    // // }
    console.log("JOJO");
  });

  return (
    <div className="container">
      <div id="nav">
        <NavigationBar/>
      </div>

      <div id="main">
        Main

        <img src="../chess_pieces/1.png"></img>

      </div>

      
      <div id="footer">
        <Footer/>
      </div>
    </div>
  );
}