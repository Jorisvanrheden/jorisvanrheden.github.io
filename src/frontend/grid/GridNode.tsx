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

export enum GRID_STATUS
{
    DEFAULT = 0,
    START = 1,
    TARGET = 2, 
    VISITED = 3, 
    PATH = 4
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
                case GRID_STATUS.DEFAULT:
                    style+="light ";
                    break;
                case GRID_STATUS.START:
                    style+="start ";
                    break;
                case GRID_STATUS.TARGET:
                    style+="target ";
                    break;
                case GRID_STATUS.VISITED:
                    style+="visited ";
                    break;
                case GRID_STATUS.PATH:
                    style+="path ";
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