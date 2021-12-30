import "./ChessProject.css"

import ChessBoard from "../../Logic/Chess/ChessBoard"
import ChessTile from "../ChessProject/ChessTile/ChessTile"
//Logic imports

export default function ChessProject()
{
    //this stuff should definitely be in a MODEL (chess_model)
    //now its just purely for testing
    let board:ChessBoard = new ChessBoard(8, 8);

    let start = {x:0, y:0};
    let target = {x:0, y:0};

    const tiles = [
      [11,10,9,8,7,9,10, 11],
      [12,12,12,12,12,12,12,12],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [0,0,0,0,0,0,0,0],
      [6,6,6,6,6,6,6,6],
      [5,4,3,2,1,3,4,5]
    ];
    board.setTiles(tiles)

    let squares = board.getTiles();

    function setStart(x:number, y:number)
    {
        start.x = x;
        start.y = y;
    }

    function setTarget(x:number, y:number)
    {
        target.x = x;
        target.y = y;
    }

    function processMove()
    {
        console.log("Move from: ");
        console.log(start);
        console.log("to: ");
        console.log(target);
    }

    return(
        <div className="chess-container">
            <div className="chess-board">
            {
                // <div className="chess-board-square"></div>
                squares.map((values:any[], xIndex:number) => 
                (
                    <div>
                        {
                        values.map((value:any, yIndex:number) => 
                        (
                            <ChessTile  x={xIndex} 
                                        y={yIndex} 
                                        pieceID={board.getPieceAt(xIndex, yIndex)}
                                        setStart={setStart}
                                        setTarget={setTarget}
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