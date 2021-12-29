import { useState } from "react";
import "./ChessTile.css"

interface Props
{
    x:number;
    y:number;
    pieceID:number;
}

export default function ChessTile(props:Props)
{    
    const [dragging, setDragging] = useState(false);

    function getStyle(x:number, y:number)
    {
        let isEven = (((x + y) % 2) === 0);

        let style = "chess-board-square ";

        if(isEven)
        {
            style += "chess-board-square-light";
        }
        else
        {
            style += "chess-board-square-dark"
        }


        return style;
    }

    function getPieceStyle()
    {
        let style = "draggable ";

        if(dragging) style += " dragging"
        
        return style;
    }

    function getPieceImage()
    {
        return "../chess_pieces/" + props.pieceID.toString() + ".png";
    }

    function onDragStart()
    {
        setDragging(true);
    }
    function onDragEnd()
    {
        setDragging(false);
    }

    return(
        <div className={getStyle(props.x, props.y)}>
            {
                props.pieceID > 0 &&
                <div className={getPieceStyle()}
                 draggable="true"
                 onDragStart={()=>{onDragStart()}}
                 onDragEnd={()=>{onDragEnd()}}
                >
                    <img
                        className="chess-board-square-image" 
                        src={getPieceImage()}>
                    </img>
                </div>
            }
    </div>
    )
}