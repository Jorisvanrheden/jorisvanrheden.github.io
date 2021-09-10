import "./Dropdown.css"
import DropdownItem from "./DropdownItem/DropdownItem"
import DropdownHeader from "./DropdownHeader/DropdownHeader"

import YoutubeProjectData from "./../../Logic/ProjectInformation/YoutubeProjects"

interface Props
{
  entries:Array<YoutubeProjectData>
}

export default function Dropdown(props:Props)
{
    return(
        <div>
            <div className="dropdown-body">
                <DropdownHeader/>
                {
                    props.entries.map((item:YoutubeProjectData, index) => 
                    (
                        <DropdownItem title={index+1 + " - " + item.description}/>            
                    ))
                } 
            </div>
        </div>     
    )
}