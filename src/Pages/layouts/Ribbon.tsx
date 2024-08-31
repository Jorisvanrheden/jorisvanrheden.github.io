//styling imports
import { useState } from "react"
import "./Ribbon.css"

interface RibbonItem
{
    title:string;
    url:string;
}

const menuItems: Array<RibbonItem> =
[
    {title: "YouTube", url: "/youtube"},
    {title: "Software Projects", url: "/projects"},
]

export default function Ribbon()
{
    const [open, setOpen] = useState(false);

    function getStyle(isOpen:boolean)
    {
        let style = "nav-dropdown";

        if(isOpen)
        {
            style += " nav-dropdown-open";
        }

        return style;
    }

    return(
        <div className="nav">
            <div className="nav-left">
                <div className="nav-title">
                    Joris van Rheden
                </div>
            </div>
            <div className="nav-right">
                <ul className="nav-menu">
                    {/* using curly braces for scripting in a div element */}
                    {
                        menuItems.map((item:RibbonItem, index) => 
                        (
                            <li key={index}>
                                <a className="nav-item" href={item.url}>
                                    {item.title}
                                </a>
                            </li>                  
                        ))
                    }
                </ul>
            </div>    

            <div className="hamburger" 
                 onClick={()=>
                 {
                     setOpen(!open);
                 }}
            >
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>   

            <div className={getStyle(open)}>
                {
                    menuItems.map((item:RibbonItem, index) => 
                    (
                        <a className="nav-dropdown-item" href={item.url}>
                            {item.title}
                        </a>                
                    ))
                }        
            </div>
        </div>    
    )
}