import "./ChessProject.css"

import ChessBoard from "../../Logic/Chess/ChessBoard"
import ChessTile from "../ChessProject/ChessTile/ChessTile"
//Logic imports

export default function ChessProject()
{
    //this stuff should definitely be in a MODEL (chess_model)
    //now its just purely for testing
    let board:ChessBoard = new ChessBoard(8, 8);

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

    function dragStart()
    {
        console.log("start");
    }

    function dragStop()
    {
        console.log("stop");
    }

    function dragMove(event:any)
    {
        console.log(event.clientX + ", " + event.clientY);
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
                            <ChessTile x={xIndex} y={yIndex} pieceID={board.getPieceAt(xIndex, yIndex)}/>                           
                        ))
                        }
                    </div> 
                ))
            }  
            </div>
        </div>
    )
}