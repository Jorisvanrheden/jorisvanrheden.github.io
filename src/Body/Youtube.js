import "./Home.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'

export default function Youtube() {
  return (
  <div className="WebsiteMainContainer">
    <NavigationBar/>

    <a href="https://www.youtube.com/user/joris1992">Youtube Channel</a>
  </div>
  );
}