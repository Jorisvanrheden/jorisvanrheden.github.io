import "./DropdownItem.css"

interface Props
{
  title:string;
  selected:boolean;
  index:number;

  setIndex:(index:number) => void;
}

export default function DropdownItem(props:Props)
{
    function getStyle() 
    {
        let style = "dropdown-item ";

        if(props.selected)
        {
            style += "dropdown-item-selected";
        }
        else
        {
            style += "dropdown-item-idle";
        }

        return style;
    }    

    return(
        <div>
            <div className={getStyle()}
                 onClick={event => 
                    {
                        props.setIndex(props.index);
                    }}
            >
                {props.title}
            </div>
        </div>     
    )
}