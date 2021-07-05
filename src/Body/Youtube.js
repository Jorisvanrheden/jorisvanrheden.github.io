import "./Home.css"

//component imports
import NavigationBar from '../Components/NavigationBar/NavigationBar'
import YoutubeEmbed from '../Components/YoutubeEmbed/YoutubeEmbed'

export default function Youtube() {
  return (
  <div className="WebsiteMainContainer">
    <NavigationBar/>
    <YoutubeEmbed 
      description="Testing first link"
      url="https://www.youtube.com/embed/rbQ-Hn2hN8o"/>
    <YoutubeEmbed 
      description="And second one"
      url="https://www.youtube.com/embed/SvuitFzDxDg"/>      
    <a href="https://www.youtube.com/user/joris1992">Youtube Channel</a>
  </div>
  );
}