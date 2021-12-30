import { useState } from "react";
import "./ChessTile.css"

interface Props
{
    x:number;
    y:number;
    pieceID:number;

    highlighted:boolean;

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

        let style = "square ";

        if(isEven)
        {
            style += "square-dark"
        }
        else
        {
            style += "square-light";
        }

        return style;
    }

    function getSquareStyle()
    {
        let style = "square-container ";

        if(dragging) style += " status-dragging";
        if(hoveredOver && props.highlighted)
        {
            if(props.pieceID === 0)
            {
                style += " status-hovering-empty";
            }
            else
            {
                style += " status-hovering-target";
            }
        }

        return style;
    }

    function getSquareStatusStyle()
    {
        let style = "";
        
        if(props.highlighted)
        {
            if(props.pieceID > 0)
            {
                style += " square-hit";
            }
            else
            {
                style += " square-move";
            }
        }

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
                <div className={getSquareStyle()}
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
                            className="square-image" 
                            src={getPieceImage()}>
                        </img>
                    }  
                    {                      
                        <div className={getSquareStatusStyle()}/>
                    }             
                </div>
            }
        </div>
    )
}