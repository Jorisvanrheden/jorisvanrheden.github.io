//styling imports
import { useState } from "react"
import "./NavigationBar.css"

interface NavigationMenuItem
{
    title:string;
    url:string;
}

const menuItems: Array<NavigationMenuItem> =
[
    {title: "YouTube", url: "/youtube"},
    {title: "Software Projects", url: "/projects"},
]

export default function Navigationbar()
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
                        menuItems.map((item:NavigationMenuItem, index) => 
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
                    menuItems.map((item:NavigationMenuItem, index) => 
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