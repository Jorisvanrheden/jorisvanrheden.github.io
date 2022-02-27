import "./MancalaProject.css"

import MancalaModel from "../../Logic/Mancala/MancalaModel"
import MancalaPlayerArea from "../MancalaProject/MancalaPlayerArea/MancalaPlayerArea"
//Logic imports

import { useState } from "react";

interface Props
{
    model:MancalaModel;
}

export default function MancalaProject(props:Props)
{
    const [boardState, setBoardState] = useState([1,2,3,4]);
  
    props.model.attachObserver(setBoardState);
    //declare useState variables here for the game logic

    return(
        <div className="mancala-container">
            <div className="mancala-board">
                <div className="mancala-player-areas">
                <button onClick={()=>
                        {
                            props.model.joinGame();
                        }}>JOIN</button>
                    <button onClick={()=>
                        {
                            props.model.getGameState();
                        }}>UPDATE</button>

<button onClick={()=>
                        {
                            props.model.playMove(0);
                        }}>MOVE</button>

                    <div id="mancala-area-top">
                        <MancalaPlayerArea fields={boardState}/>
                    </div>
                    <div id="mancala-area-left">
                        <MancalaPlayerArea fields={[1]}/>
                    </div>
                    <div id="mancala-area-bottom">
                        <MancalaPlayerArea fields={[1,2,3]}/>
                    </div>
                    <div id="mancala-area-right">
                        <MancalaPlayerArea fields={[1]}/>
                    </div>
                </div>
            </div>
        </div>
    )
}