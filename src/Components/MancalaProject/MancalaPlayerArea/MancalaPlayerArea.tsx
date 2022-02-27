import "./../MancalaProject.css"

import MancalaPlayerPit from "../MancalaPlayerArea/MancalaPlayerPit"

import { useState } from "react";

interface Props
{
    fields:Number[];
    
}

export default function MancalaPlayerArea(props:Props)
{
    //declare useState variables here for the game logic

    return(
        <div className="mancala-player-area">
            {
                props.fields.map((values:Number) => 
                (
                    <MancalaPlayerPit tokenCount={3}
                                      pitID={2}/>
                ))
            }  
        </div>
    )
}