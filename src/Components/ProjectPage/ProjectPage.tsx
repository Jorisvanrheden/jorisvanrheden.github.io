import YoutubeEmbed from "../YoutubeEmbed/YoutubeEmbed"
import "./ProjectPage.css"

import YoutubeProjectData from "./../../Logic/ProjectInformation/YoutubeProjects"
import SheetDisplayer from "./../SheetDisplayer/SheetDisplayer"

interface Props
{
  entry:YoutubeProjectData;
}

export default function ProjectPage(props:Props)
{
    return(
        <div className="projectpage-body">
            {/* We need:
            - Video + Sheet row
            - Pages previews + download */}
            <div className="projectpage-center">
                <YoutubeEmbed 
                description={props.entry.description}
                url={props.entry.url}/>
            </div>
            <div className="projectpage-sheet">
                <SheetDisplayer image={props.entry.image}
                                location={props.entry.location}/>
            </div>
        </div>
    )
}
