import "../GridNode/GridNode.css"

interface Props
{
    x:number;
    y:number;

    walkable:boolean;

    processMouseClick:(x:number, y:number) => void;
    processMouseEnter:(x:number, y:number) => void;
}

export default function GridNode(props:Props)
{   
    function getCellStyle() {
        let style = "cell ";
        
        style += (props.walkable)?"light ":"dark ";

        return style;
    }

    return (
        <div 
            className={getCellStyle()}

            onMouseDown={()=>props.processMouseClick(props.x, props.y)}
            onMouseEnter={()=>props.processMouseEnter(props.x, props.y)}
        >
        </div>
    )
}