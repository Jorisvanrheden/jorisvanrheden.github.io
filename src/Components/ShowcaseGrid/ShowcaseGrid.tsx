import "./ShowcaseGrid.css"

import ShowcaseElement from "../ShowcaseElement/ShowcaseElement"

export default function ShowcaseGrid()
{
    return(
        <ul className="grid-body">   
            <li><ShowcaseElement/></li>   
            <li><ShowcaseElement/></li>   
            <li><ShowcaseElement/></li>   
            <li><ShowcaseElement/></li>   
            <li><ShowcaseElement/></li>   
            <li><ShowcaseElement/></li>   
        </ul>
    )
}