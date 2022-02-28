import "./../MancalaProject.css"

import MancalaPlayerPit from "../MancalaPlayerArea/MancalaPlayerPit"

import { useState } from "react";

interface Props
{
    fieldsIndices:number[];
    fields:number[];
    moves:number[];
    isActivePlayer:boolean;

    selectPit:(pitId:number) => void;
}

export default function MancalaPlayerArea(props:Props)
{
    //declare useState variables here for the game logic

    function canBeSelected(pitId:number)
    {
        for(let i=0;i<props.moves.length;i++)
        {
            if(pitId === props.moves[i]) return true;
        }
        return false;
    }

    return(
        <div className="mancala-player-area">
            {
                props.fieldsIndices.map((pitId:number) => 
                (
                    <MancalaPlayerPit tokenCount={props.fields[pitId]}
                                      pitID={pitId}
                                      isActivePlayer={props.isActivePlayer}
                                      canBeSelected={canBeSelected(pitId)}
                                      selectPit={props.selectPit}/>
                ))
            }  
        </div>
    )
}