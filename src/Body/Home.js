import "./Home.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import ShowcaseGrid from '../Components/ShowcaseGrid/ShowcaseGrid'
import Dropdown from '../Components/Dropdown/Dropdown'

export default function Home() {
  return (
  <div className="WebsiteMainContainer">
    <NavigationBar/>
    <Dropdown/>
    {/* <ShowcaseGrid/> */}
  </div>
  );
}