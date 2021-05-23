import "./Home.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import ShowcaseGrid from '../Components/ShowcaseGrid/ShowcaseGrid'

export default function Home() {
  return (
  <div className="WebsiteMainContainer">
    <NavigationBar/>
    <ShowcaseGrid/>
  </div>
  );
}