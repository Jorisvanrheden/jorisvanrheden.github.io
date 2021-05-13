import "./ShowcaseElement.css"

export default function ShowcaseElement()
{
    return(
        <div className="showcase-body">
            <img className="showcase-content" src="bloem.jpg" alt="ss"></img>
            <div className="showcase-info">
                <div className="showcase-description">
                    This is a super awesome project where i did this and that.
                    Checking hwo new lines work;
                </div>
            </div>        
        </div>
    )
}