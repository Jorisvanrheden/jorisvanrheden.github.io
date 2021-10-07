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
        <div className="sheet-container">
            <div id="preview">
                <img className="preview-image" src="music.png"></img>
            </div>
            <div id="overview">
                <div className="sheet-body">
                    <ul className="sheet-grid">
                        {
                            menuItems.map((item:test, index) => 
                            (
                                <li>
                                    <img className="sheet-item" src={props.image} alt="ss"></img>
                                </li>                  
                            ))                                     
                        }
                    </ul> 
                </div>
            </div>
        </div>
    )
}

