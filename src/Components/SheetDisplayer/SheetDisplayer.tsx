import "./SheetDisplayer.css"

interface Props
{
    image:string;
}

export default function SheetDisplayer(props:Props)
{
    return(
        <div className="sheet-body">
            <ul className="sheet-grid">
                {/* using curly braces for scripting in a div element */}
                {
                    <li>
                        <img className="sheet-item" src={props.image} alt="ss"></img>
                    </li> 
                }
            </ul>
        </div>    
        
        // <div className="showcase-body">
        //     <div className="showcase-content">
        //         <img className="showcase-image" src={props.image} alt="ss"></img>
        //     </div>
        //     <div className="showcase-info">
        //         <div className="showcase-description">
        //             {props.description}
        //         </div>
        //     </div>        
        // </div>
    )
}

