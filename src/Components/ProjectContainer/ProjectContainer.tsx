import "./ProjectContainer.css"

import ProjectPage from '../../Components/ProjectPage/ProjectPage'
import Dropdown from '../../Components/Dropdown/Dropdown'

import YoutubeProjectData, {YoutubeProjectEntries} from "./../../Logic/ProjectInformation/YoutubeProjects"

export default function ProjectContainer()
{
    return(
        <div className="projectcontainer-body">
            <div className="projectcontainer-left">
                <Dropdown entries={YoutubeProjectEntries}/>
            </div>
            <div className="projectcontainer-right">
                <ProjectPage entry={YoutubeProjectEntries[0]}/>
            </div>
        </div>
    )
}
