import "./ChessProject.css"

import ChessModel from "../../backend/chess/ChessModel"
import { useState } from "react";
import ChessTile from "./ChessTile";

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

    function resetSelectedInput()
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
        resetSelectedInput();
    }

    function processMove()
    {
        props.model.processMove(start, target);
        
        resetSelectedInput();

        setTiles(props.model.getTiles());
    }

    function undoLatestMove()
    {
        props.model.undoMove();

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
            <div id="empty">
                
            </div>
            <div id="board">
                <div className="chess-board">
                    <div className="chess-board-inside">
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
            </div>
            <div id="moves">
                <div className="moves-overview">
                    <button onClick={() => undoLatestMove() }>Undo latest move</button>
                </div>
            </div>
            
        </div>
    )
}