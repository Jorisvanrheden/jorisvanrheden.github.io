import "./Toolbar.css"

import { ToolbarItemGroup } from "./ToolbarItemGroup"

export default function Toolbar()
{
    function setIndex(index:number)
    {
        
    }

    return(
        <div className="toolbar-body">
            <ToolbarItemGroup names={
                [
                    "BFS", 
                    "DFS", 
                    "AStar(*)", 
                    "Dijkstra"
                ]}
                activeIndex={0}
                setIndex={setIndex}
            />
            <ToolbarItemGroup names={
                [
                    "Toggle", 
                    "Set Start", 
                    "Set Target"
                ]}
                activeIndex={1}
                setIndex={setIndex}
            />

            <ToolbarItemGroup names={
                [
                    "Clear", 
                    "Randomize", 
                    "Calculate"
                ]}
                activeIndex={-1}
                setIndex={setIndex}
            />
        </div>
    )
}
