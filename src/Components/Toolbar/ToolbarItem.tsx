import "../../Components/Toolbar/Toolbar"

interface Props
{
    name:string;
    index:number;
    selected:boolean;
    
    setIndex:(index:number) => void;
}

export function ToolbarItem(props:Props)
{
    function getStyle()
    {
        let style = "toolbar-item ";
        if(props.selected)
        {
            style += "toolbar-item-selected";
        }
        
        return style;
    }

    return(
        <div className={getStyle()}
             onClick={()=>props.setIndex(props.index)}
        >
            <div className="toolbar-item-text"> 
                {props.name}
            </div>
        </div>
    )
}
