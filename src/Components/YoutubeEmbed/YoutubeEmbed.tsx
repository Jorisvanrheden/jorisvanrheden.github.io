import "./YoutubeEmbed.css"

interface Props
{
    description:string;
    url:string;
}

export default function YoutubeEmbed(props:Props)
{
    return(
        <div className="embed-body"> 
            <iframe
                src={props.url} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen>
            </iframe>
        </div>     
    )
}

