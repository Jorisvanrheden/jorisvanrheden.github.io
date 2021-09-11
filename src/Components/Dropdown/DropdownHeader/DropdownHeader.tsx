import "./DropdownHeader.css"

interface Props
{
  
}

export default function DropdownHeader(props:Props)
{
    return(
        <div>
            <div className="dropdown-header">
                <img className="dropdown-logo" src="youtube.png"></img>
                YouTube (joris1992)
            </div>
        </div>     
    )
}