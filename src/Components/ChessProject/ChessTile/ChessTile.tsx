import { useState } from "react";
import "./ChessTile.css"

interface Props
{
    x:number;
    y:number;
    pieceID:number;

    //property for indicating that the tile has been selected
    //selected tiles are visualized in two ways
    //- selected tile is highlighted
    //- possible moves are highlighted
    isSelected:boolean;
    isPossibleMove:boolean;

    selectPiece:(x:number, y:number) => void;
    selectTarget:(x:number, y:number) => void;
    deselectPiece:() => void;
    processMove:() => void;
}

export default function ChessTile(props:Props)
{    
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

        if(props.isSelected) style += " status-selected";
        if(hoveredOver && props.isPossibleMove)
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
        
        if(props.isPossibleMove)
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

    //Dragging functionality
    function onDragStart(event:any)
    {        
        props.selectPiece(props.x, props.y);
    }
    function onDragEnd(event:any)
    {
        props.processMove();
    }
    function onDragEnter(event:any)
    {
        props.selectTarget(props.x, props.y);

        setHoveredOver(true);
    }
    function onDragLeave(event:any)
    {
        setHoveredOver(false);
    }

    //Clicking functionality
    function onClick()
    {
        //check if the selected tile was a potential move
        if(props.isPossibleMove)
        {
            props.selectTarget(props.x, props.y);
            props.processMove();
        }
        else
        {
            //if the piece was already selected, deselect it 
            if(props.isSelected)
            {
                props.deselectPiece();
            }
            else
            {
                props.selectPiece(props.x, props.y);
            }
        }
    }

    function onMouseEnter()
    {
        props.selectTarget(props.x, props.y);

        setHoveredOver(true);
    }

    function onMouseLeave()
    {
        setHoveredOver(false);
    }

    function getDraggable()
    {
        return props.pieceID > 0;
    }

    return(
        <div className={getStyle(props.x, props.y)}>
            {
                //we place two types of divs, depending on the 
                <div className={getSquareStyle()}
                 draggable={getDraggable()}
                 onDragStart={(event)=>{onDragStart(event)}}
                 onDragEnd={(event)=>{onDragEnd(event)}}
                 onDragEnter={(event)=>{onDragEnter(event)}}
                 onDragLeave={(event)=>{onDragLeave(event)}}  
                                 
                 onClick={()=>{onClick()}}
                 onMouseEnter={()=>{onMouseEnter()}}
                 onMouseLeave={()=>{onMouseLeave()}}
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