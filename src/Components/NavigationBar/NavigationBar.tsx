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
        <div className="Navbar">
            <div className="nav-icon">
                <i className={getActiveIcon(opened)}
                   onClick={event =>
                    {
                        setOpened(!opened);
                    }}
                />
            </div>
            <ul className="NavbarMenu">
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