import "./ProjectContainer.css"

import ProjectPage from '../../Components/ProjectPage/ProjectPage'
import Dropdown from '../../Components/Dropdown/Dropdown'
import ProjectContainerItem from './ProjectContainerItem/ProjectContainerItem'

import YoutubeProjectData, {YoutubeProjectEntries} from "./../../Logic/ProjectInformation/YoutubeProjects"

import {useState} from 'react'

export default function ProjectContainer()
{
    const [index, setIndex] = useState(0);

    function updateIndex(index:number)
    {
        setIndex(index);
    }

    return(
        <div>
            <div className="projectcontainer-body">
                <div className="projectcontainer-left">
                    <Dropdown entries={YoutubeProjectEntries}
                            activeIndex={index}
                            setIndex={updateIndex}
                    />
                </div>
                <div className="projectcontainer-right">
                    <ProjectPage entry={YoutubeProjectEntries[index]}/>
                </div>
            </div>
            <div className="projectcontainer-scroll">
                {
                    YoutubeProjectEntries.map((item:YoutubeProjectData, index) => 
                    (
                        <ProjectContainerItem entry={item}/>
                    ))        
                }   
            </div>
        </div>     
    )
}
