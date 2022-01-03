import "./ChessProject.css"

import ChessModel from "../../Logic/Chess/ChessModel"
import ChessTile from "../ChessProject/ChessTile/ChessTile"
//Logic imports

import { useState } from "react";

interface Props
{
    model:ChessModel;
}

export default function ChessProject(props:Props)
{
    const [start, setStart] = useState({x:-1, y:-1});
    const [target, setTarget] = useState({x:-1, y:-1});
    const [possibleTiles, setPossibleTiles]:any = useState([]);
    const [tiles, setTiles] = useState(props.model.getTiles());

    function reset()
    {
        setStart({x:-1, y:-1});
        setTarget({x:-1, y:-1});
        setPossibleTiles([]);
    }

    function processSelectPiece(x:number, y:number)
    {
        //validate that the start position has a piece on it
        //TODO validations like these should obviously go somewhere else
        //they are already in the API
        if(props.model.getTile(x, y).ID === 0) 
        {
            //empty the move list and reset some general settings
            processDeselect();
            return;
        }

        let moves:any = props.model.getMoves(x, y);
        
        setPossibleTiles(moves);

        setStart({x:x, y:y});
    }

    function processSelectTarget(x:number, y:number)
    {
        setTarget({x:x, y:y});
    }

    function processDeselect()
    {
        reset();
    }

    function processMove()
    {
        props.model.processMove(start, target);
        
        reset();

        //TODO: updating tiles should be done through a callback
        setTiles(props.model.getTiles());
    }

    function getIsSelected(x:number, y:number, startNode:any)
    {        
        return (start.x === x && start.y === y);
    }

    function getIsPossibleMove(x:number, y:number, startNode:any)
    {        
        //if moves contain {x, y} return true
        for(let i= 0;i<possibleTiles.length;i++)
        {   
            if(possibleTiles[i].xValue === x && possibleTiles[i].yValue === y) 
            {
                return true;       
            }
        }

        return false;
    }

    return(
        <div className="chess-container">
            <div className="chess-board">
                <div className="chess-grid">
                {
                    tiles.map((values:any[]) => 
                    (
                        <div className="chess-row">
                            {
                                values.map((value:any) => 
                                (
                                    <ChessTile  x={value.x} 
                                                y={value.y} 
                                                pieceID={props.model.getTile(value.x, value.y).ID}
                                                isSelected={getIsSelected(value.x, value.y, start)}
                                                isPossibleMove={getIsPossibleMove(value.x, value.y, start)}
                                                selectPiece={processSelectPiece}
                                                selectTarget={processSelectTarget}
                                                deselectPiece={processDeselect}
                                                processMove={processMove}
                                    />                           
                                ))
                            }
                        </div> 
                    ))
                }  
                </div>
            </div>
        </div>
    )
}