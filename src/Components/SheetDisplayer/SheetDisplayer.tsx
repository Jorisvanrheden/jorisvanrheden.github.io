import "./SheetDisplayer.css"

interface Props
{
    image:string;
    location:string;
}

interface test
{
    title:string;
    class:string,
    url:string;
}

const menuItems: Array<test> =
[
    {title: "Home", class: "nav-item", url: "/"},
    {title: "About", class: "nav-item", url: "/about"},
    {title: "Software Projects", class: "nav-item", url: "/software"},
    {title: "Youtube", class: "nav-item", url: "/youtube"},
]

export default function SheetDisplayer(props:Props)
{
    return(
        <div className="sheet-body">
            <ul className="sheet-grid">
                {/* using curly braces for scripting in a div element */}
                {
                    menuItems.map((item:test, index) => 
                    (
                        <li>
                            <img className="sheet-item" src={props.image} alt="ss"></img>
                        </li>                  
                    ))                                     
                }
            </ul>        
            <a href={props.location} download>
                <button>Download</button>
            </a>
        </div>    
    )
}

