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
    const [boardState, setBoardState] = useState([]);
    const [gameStatus, setGameStatus] = useState(-2);
    const [gameOver, setGameOver] = useState(false);

    props.model.attachObserver(setBoardState);
    props.model.attachGameReadyObserver(setGameStatus);
    props.model.attachGameStateObserver(setGameOver);

    //declare useState variables here for the game logic

    function getFieldRangeForPlayer(playerId:number, fields:number[], reverse:Boolean)
    {
        if(!props.model.gameState)return[];

        let largePitIndex = props.model.gameState.boardGameState.playerData[playerId].largePitIndex;

        let range = getFieldRange(
            props.model.gameState.boardGameState.playerData[playerId].tokenStartId,
            props.model.gameState.boardGameState.playerData[playerId].tokenEndId,
            fields, largePitIndex)

        if(reverse)
        {
            range = range.reverse();
        }

        return range;
    }

    function getLargePitForPlayer(playerId:number)
    {
        if(!props.model.gameState)return[];

        let largePit:number = props.model.gameState.boardGameState.playerData[playerId].largePitIndex;
        return [ largePit ];
    }

    function getFieldRange(min:number, max:number, fields:number[], largePitIndex:number)
    {
        let fieldChunk:number[] = [];

        for(let i:any=min;i<max;i++)
        {
            if(i === largePitIndex) continue;

            fieldChunk.push(i);
        }

        return fieldChunk;
    }

    function selectPit(pitId:number)
    {
        props.model.playMove(pitId);
    }

    function getIsActivePlayer()
    {
        return props.model.gameState.boardGameState.activePlayerID === props.model.gameState.boardGameState.clientPlayerID;
    }

    function getBottomPlayer()
    {
        return props.model.gameState.boardGameState.clientPlayerID;
    }

    function getTopPlayer()
    {
        let playerIds:number[] = [];
        for(let i=0;i<props.model.gameState.boardGameState.playerData.length;i++)
        {
            playerIds.push(i);
        }

        const index = playerIds.indexOf(props.model.gameState.boardGameState.clientPlayerID);
        if (index > -1) 
        {
            playerIds.splice(index, 1); 
        }

        return playerIds[0];
    }

    return(
        <div className="mancala-container">
            <div className="mancala-board">
                {
                    (gameStatus === 0) &&
                    <div className="mancala-player-areas">
                        <div id="mancala-area-top">
                             <MancalaPlayerArea fields={boardState} 
                                             selectPit={selectPit}
                                             moves={props.model.gameState.boardGameState.availableMoves}
                                             isActivePlayer={getIsActivePlayer()}
                                             fieldsIndices={getFieldRangeForPlayer(getTopPlayer(), boardState, true)}/>
                         </div>
                         <div id="mancala-area-left">
                             <MancalaPlayerArea fields={boardState} 
                                             selectPit={selectPit}
                                             moves={props.model.gameState.boardGameState.availableMoves}
                                             isActivePlayer={getIsActivePlayer()}
                                             fieldsIndices={getLargePitForPlayer(getTopPlayer())}/>
                         </div>
                         <div id="mancala-area-bottom">
                             <MancalaPlayerArea fields={boardState} 
                                             selectPit={selectPit}
                                             isActivePlayer={getIsActivePlayer()}
                                             moves={props.model.gameState.boardGameState.availableMoves}
                                             fieldsIndices={getFieldRangeForPlayer(getBottomPlayer(), boardState, false)}/>
                         </div>
                         <div id="mancala-area-right">
                             <MancalaPlayerArea fields={boardState} 
                                                 selectPit={selectPit}
                                                 isActivePlayer={getIsActivePlayer()}
                                                 moves={props.model.gameState.boardGameState.availableMoves}
                                                 fieldsIndices={getLargePitForPlayer(getBottomPlayer())}/></div> 
                    </div>
                }

                {
                    (gameStatus === -2) &&
                    <button onClick={()=>
                        {
                            props.model.joinGame();
                        }}>Join a new game</button>
                }

                {
                    (gameStatus === -1) &&
                    <div>
                        Waiting for a player to join the game
                    </div>
                }

                {
                    gameOver &&
                    <div>
                        <div className="mancala-gameover">
                        Game Over! Winner is player {props.model.gameState.winningPlayerID + 1} with score: 
                        {props.model.gameState.boardGameState.playerData[props.model.gameState.winningPlayerID].score};
                        </div>

                        <button onClick={()=>
                        {
                            props.model.joinGame();
                        }}>Join a new game!</button>
                    </div>
                    
                }
            </div>
        </div>
    )
}