import "./ProjectContainer.css"

import Dropdown from '../Dropdown/Dropdown'
import SheetDisplayer from "../SheetDisplayer/SheetDisplayer"
import ProjectContainerItem from "./ProjectContainerItem/ProjectContainerItem"

import {YoutubeProjectEntries} from "./../../Logic/ProjectInformation/YoutubeProjects"

import {useState} from 'react'

export default function ProjectContainer()
{
    const [index, setIndex] = useState(0);

    function updateIndex(index:number)
    {
        setIndex(index);
    }

    return(
        <div className="project-body">
            <div id="dropdown">
                <Dropdown entries={YoutubeProjectEntries}
                            activeIndex={index}
                            setIndex={updateIndex}/>
            </div>
            <div id="video">
                <ProjectContainerItem entry={YoutubeProjectEntries[index]}/>
            </div>
            {/* <div id="sheet">
                <SheetDisplayer image={YoutubeProjectEntries[index].image}
                                location={YoutubeProjectEntries[index].location}/>
            </div> */}
        </div>     
    )
}
