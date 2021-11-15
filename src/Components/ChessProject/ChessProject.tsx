import "./ChessProject.css"

import ChessBoard from "../../Logic/Chess/ChessBoard"
//Logic imports

export default function ChessProject()
{
    //this stuff should definitely be in a MODEL (chess_model)
    //now its just purely for testing
    let board:ChessBoard = new ChessBoard(8, 8);
    let squares = board.getTiles();

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
                            <div className={getStyle(xIndex, yIndex)}>
                                <img 
                                    className="chess-board-square-image" 
                                    src="queen.png">
                                </img>
                            </div>
                        ))
                        }
                    </div> 
                ))
            }  
            </div>
        </div>
    )
}