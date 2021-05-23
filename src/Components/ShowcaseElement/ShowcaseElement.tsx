import "./ShowcaseElement.css"

interface Props
{
    title:string;
    description:string,
    image:string;
}

export default function ShowcaseElement(props:Props)
{
    return(
        <div className="showcase-body">
            <div className="showcase-content">
                <img className="showcase-image" src={props.image} alt="ss"></img>
            </div>
            <div className="showcase-info">
                <div className="showcase-description">
                    {props.description}
                </div>
            </div>        
        </div>
    )
}