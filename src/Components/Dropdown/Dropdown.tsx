import "./Dropdown.css"
import DropdownItem from "./DropdownItem/DropdownItem"
import DropdownHeader from "./DropdownHeader/DropdownHeader"

interface ShowcaseItem
{
    title:string;
    description:string,
    image:string;
}

let menuItems: Array<ShowcaseItem> =
[
    {title: "Test", description: "Game Engine (C#/C++)", image: "Scarbo"},
    {title: "Test", description: "Chess game", image: "chess.png"},
    {title: "Test", description: "Mandelbrot", image: "mandelbrot.png"},
    {title: "Test", description: "Pathfinding", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"}
]

export default function Dropdown()
{
    return(
        <div>
            <div className="dropdown-body">
                <DropdownHeader/>
                {
                    menuItems.map((item:ShowcaseItem, index) => 
                    (
                        <DropdownItem title={index+1 + " - " + item.description}/>            
                    ))
                } 
            </div>
        </div>     
    )
}