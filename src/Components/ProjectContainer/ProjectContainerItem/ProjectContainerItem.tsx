import YoutubeProjectData from "../../../Logic/ProjectInformation/YoutubeProjects"
import YoutubeEmbed from "../../YoutubeEmbed/YoutubeEmbed"
import "./ProjectContainerItem.css"

interface Props
{
  entry:YoutubeProjectData
}

export default function ProjectContainerItem(props:Props)
{
    return(
        <div className="projectcontainer-container">
            <div className="projectcontainer-item">
                {/* Square
                Video top 
                bottom row has the download button */}
                <div className="projectcontainer-item-video">
                    <YoutubeEmbed 
                        description={props.entry.description}
                        url={props.entry.url}
                    />
                </div>
                <div className="projectcontainer-item-description">
                    {props.entry.description}

                    <a href={props.entry.location} download>
                        <img className="projectcontainer-item-logo" src="pdf.png" ></img>  
                    </a>           
                </div>       
            </div>
        </div>         
    )
}