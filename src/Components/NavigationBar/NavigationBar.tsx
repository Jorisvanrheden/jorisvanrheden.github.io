import NavigationMenuItem from "./NavigationMenuItems"

//styling imports
import "./NavigationBar.css"
import { useState } from "react";

let menuItems: Array<NavigationMenuItem> =
[
    {title: "Home", class: "nav-item", url: "TestURL"},
    {title: "About", class: "nav-item", url: "TestURL"},
    {title: "Software Projects", class: "nav-item", url: "TestURL"},
    {title: "Development", class: "nav-item", url: "TestURL"},
    {title: "Piano/Music", class: "nav-item", url: "TestURL"}
]

export default function Navigationbar()
{
    const [opened, setOpened] = useState(false);

    function getActiveIcon(status:boolean)
    {
        return status ? "fas fa-times" : "fas fa-bars";
    }

    return(
        <div className="nav">
            <div className="nav-title">
                Joris van Rheden
            </div>
            <ul className="nav-menu">
                {/* using curly braces for scripting in a div element */}
                {
                    menuItems.map((item:NavigationMenuItem, index) => 
                    (
                        <li key={index}>
                            <a className={item.class} href={item.url}>
                                {item.title}
                            </a>
                        </li>                  
                    ))
                }
            </ul>
        </div>    
    )
}