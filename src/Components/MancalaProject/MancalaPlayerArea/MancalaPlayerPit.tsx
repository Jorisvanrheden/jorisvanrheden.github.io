import "./../MancalaProject.css"

import { useState } from "react";

interface Props
{
    pitID:number;
    tokenCount:number;
    canBeSelected:boolean;
    isActivePlayer:boolean;

    selectPit:(pitId:number) => void;
}

export default function MancalaPlayerPit(props:Props)
{
    //declare useState variables here for the game logic

    function getStyle()
    {
        let style = "mancala-player-pit";

        if(props.canBeSelected)
        {
            if(props.isActivePlayer)
            {
                style += " selectable";
            }
            else
            {
                style += " not-selectable";
            }
        }

        return style;
    }

    return(
        <div className={getStyle()}
            onClick={event => 
            {
                props.selectPit(props.pitID);
                console.log("Selecting pit ID: " + props.pitID);
            }}    
        >
            <div className="mancala-player-pit-content">
                {props.tokenCount}
            </div>
        </div>
    )
}