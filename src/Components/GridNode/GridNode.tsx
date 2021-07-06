import "../GridNode/GridNode.css"

interface Props
{
    x:number;
    y:number;

    walkable:boolean;
    status:number;

    processMouseClick:(x:number, y:number) => void;
    processMouseEnter:(x:number, y:number) => void;
}

export default function GridNode(props:Props)
{   
    function getCellStyle() {
        let style = "cell ";

        if(!props.walkable)
        {
            style += "dark ";
        }
        else
        {
            switch(props.status)
            {
                case 0:
                    style+="light ";
                    break;
                case 1:
                    style+="start ";
                    break;
                case 2:
                    style+="target ";
                    break;
                default:
                    style+="light ";
                    break;
            }
        }

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