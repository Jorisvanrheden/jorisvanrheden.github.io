import ProjectData from "../../resources/ProjectData";
import "./ProjectList.css"

interface Props
{
    entries:ProjectData[];
}

export default function ProjectList(props:Props)
{
    return(
        <div className="project-container">
             {
                props.entries.map((item:ProjectData, index) => 
                (
                    <a className="project-entry" href={item.url}>
                        <div className="project-entry-description">{item.description}</div>
                        <img className="project-entry-image" src={item.image}></img>
                    </a>      
                ))
            } 
        </div>
    )
}