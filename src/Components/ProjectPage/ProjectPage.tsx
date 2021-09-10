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
            - Title
            - Video + Sheet row
            - Pages previews + download */}
            <div className="projectpage-title">
                {props.entry.title}
            </div>
            <div className="projectpage-center">
                <YoutubeEmbed 
                description={props.entry.description}
                url={props.entry.url}/>

                <SheetDisplayer/>
            </div>
            <div className="projectpage-sheet">
                And here we want to have all the pages in miniature form
            </div>
        </div>
    )
}
