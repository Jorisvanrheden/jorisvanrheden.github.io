import "./../MancalaProject.css"

import { useState } from "react";

interface Props
{
    pitID:Number;
    tokenCount:Number;
}

export default function MancalaPlayerPit(props:Props)
{
    //declare useState variables here for the game logic

    return(
        <div className="mancala-player-pit"
            onClick={event => 
            {
                console.log("Selecting pit ID: " + props.pitID);
            }}    
        >
            {props.tokenCount}
        </div>
    )
}