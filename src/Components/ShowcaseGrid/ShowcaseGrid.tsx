import "./ShowcaseGrid.css"

import ShowcaseElement from "../ShowcaseElement/ShowcaseElement"

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
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"},
    {title: "Test", description: "test description", image: "TestURL"}
]

export default function ShowcaseGrid()
{
    return(
        <ul className="grid-body">   
            {
                menuItems.map((item:ShowcaseItem, index) => 
                (
                    <li><ShowcaseElement 
                        title={item.title}
                        description={item.description}
                        image={item.image}
                    /></li>                   
                ))
            }  
        </ul>
    )
}