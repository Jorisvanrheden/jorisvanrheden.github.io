import "./Toolbar"

import { useState } from "react";
import { ToolbarItem } from "./ToolbarItem"

interface Props
{
    names:string[];
    activeIndex:number;

    setIndex:(index:number) => void;
}

export function ToolbarItemGroup(props:Props)
{
    let [activeIndex, setActiveIndex] = useState(props.activeIndex);

    function getIsSelected(index:number, activeIndex:number)
    {
        return index===activeIndex;
    }

    function setIndex(index:number)
    {
        setActiveIndex(index);
        props.setIndex(index);
    }

    return(
        <div className="toolbar-item-group">
            A: 
            {/* using curly braces for scripting in a div element */}
            {
                props.names.map((name:string, index) => 
                (
                    <ToolbarItem name={name} 
                                 selected={getIsSelected(index, activeIndex)} 
                                 index={index}
                                 setIndex={setIndex}
                    />              
                ))
            }
        </div>
    )
}