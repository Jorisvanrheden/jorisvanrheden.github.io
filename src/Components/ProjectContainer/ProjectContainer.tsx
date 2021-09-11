import "./ProjectContainer.css"

import ProjectPage from '../../Components/ProjectPage/ProjectPage'
import Dropdown from '../../Components/Dropdown/Dropdown'

import {YoutubeProjectEntries} from "./../../Logic/ProjectInformation/YoutubeProjects"

import React, {useState} from 'react'

export default function ProjectContainer()
{
    const [index, setIndex] = useState(0);

    function updateIndex(index:number)
    {
        setIndex(index);
    }

    return(
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
    )
}
