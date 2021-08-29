import "./DropdownItem.css"

interface Props
{
  title:string;
}

export default function DropdownItem(props:Props)
{
    return(
        <div>
            <div className="dropdown-item">
                {props.title}
            </div>
        </div>     
    )
}