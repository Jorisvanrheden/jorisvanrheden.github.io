import "./ChessProject.css"

import ChessBoard from "../../Logic/Chess/ChessBoard"
import ChessTile from "../ChessProject/ChessTile/ChessTile"
//Logic imports

import { useState } from "react";

export default function ChessProject()
{
    const [start, setStart] = useState({x:0, y:0});
    const [target, setTarget] = useState({x:0, y:0});
    const [possibleTiles, setPossibleTiles]:any = useState([]);

    //this stuff should definitely be in a MODEL (chess_model)
    //now its just purely for testing
    let board:ChessBoard = new ChessBoard(8, 8);

    const tiles = [
      [11,10,9,8,7,9,10, 11],
      [12,12,12,12,12,12,12,12],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [8,8,8,0,12,0,0,0],
      [0,0,0,0,0,0,0,0],
      [6,6,6,6,6,6,6,6],
      [5,4,3,2,1,3,4,5]
    ];
    board.setTiles(tiles)

    let squares = board.getTiles();

    function processSetStart(x:number, y:number)
    {
        let moves:any = [];
        
        //get the potential tiles from the chess model
        //this is a mock implementation?
        moves.push({xValue: x, yValue: y - 1});
        moves.push({xValue: x, yValue: y - 2});

        setPossibleTiles(moves);

        setStart({x:x, y:y});
    }

    function processSetTarget(x:number, y:number)
    {
        setTarget({x:x, y:y});
    }

    function processMove()
    {
        // console.log("Move from: ");
        // console.log(start);
        // console.log("to: ");
        // console.log(target);

        //reset start and end?
        setStart({x:0, y:0});
        setTarget({x:0, y:0});
        setPossibleTiles([]);
    }

    function getStatus(x:number, y:number, startNode:any)
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
            {
                squares.map((values:any[], xIndex:number) => 
                (
                    <div>
                        {
                        values.map((value:any, yIndex:number) => 
                        (
                            <ChessTile  x={xIndex} 
                                        y={yIndex} 
                                        pieceID={board.getPieceAt(xIndex, yIndex)}
                                        highlighted={getStatus(xIndex, yIndex, start)}
                                        setStart={processSetStart}
                                        setTarget={processSetTarget}
                                        processMove={processMove}
                            />                           
                        ))
                        }
                    </div> 
                ))
            }  
            </div>
        </div>
    )
}