import { useState } from "react";
import "./ChessTile.css"

interface Props
{
    x:number;
    y:number;
    pieceID:number;

    setStart:(x:number, y:number) => void;
    setTarget:(x:number, y:number) => void;
    processMove:() => void;
}

export default function ChessTile(props:Props)
{    
    const [dragging, setDragging] = useState(false);
    const [hoveredOver, setHoveredOver] = useState(false);

    function getStyle(x:number, y:number)
    {
        let isEven = (((x + y) % 2) === 0);

        let style = "chess-board-square ";

        if(isEven)
        {
            style += "chess-board-square-dark"
        }
        else
        {
            style += "chess-board-square-light";
        }

        if(hoveredOver) style += " hovering"

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

    function onDragStart(event:any)
    {
        props.setStart(props.x, props.y);

        setDragging(true);
    }
    function onDragEnd(event:any)
    {
        props.processMove();

        setDragging(false);
    }
    function onDragEnter(event:any)
    {
        props.setTarget(props.x, props.y);

        setHoveredOver(true);
    }
    function onDragLeave(event:any)
    {
        setHoveredOver(false);
    }

    function onDrag(e:any)
    {

    }

    return(
        <div className={getStyle(props.x, props.y)}>
            {
                <div className={getPieceStyle()}
                 draggable="true"
                 onDragStart={(event)=>{onDragStart(event)}}
                 onDragEnd={(event)=>{onDragEnd(event)}}
                 onDragEnter={(event)=>{onDragEnter(event)}}
                 onDragLeave={(event)=>{onDragLeave(event)}}               
                 onDrag={(event)=>{onDrag(event)}}        
                >
                    {
                        props.pieceID > 0 &&
                        <img
                            className="chess-board-square-image" 
                            src={getPieceImage()}>
                        </img>
                    }                
                </div>
            }
        </div>
    )
}