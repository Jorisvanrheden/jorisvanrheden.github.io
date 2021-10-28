import { Checkbox } from "@material-ui/core";
import "./Toolbar.css"

import { ToolbarItemButton, ToolbarItemGroup } from "./ToolbarItemGroup"

export class ToolbarItemInput
{
    title:string;
    entries:string[];
    defaultIndex:number;

    onIndexChanged:(index:number)=>void;

    constructor(title:string, entries:string[], defaultIndex:number, onIndexChanged:(index:number)=>void)
    {
        this.title = title;
        this.entries = entries;
        this.defaultIndex = defaultIndex;

        this.onIndexChanged = onIndexChanged;
    } 
}

interface Props
{
    itemGroups:ToolbarItemInput[];
    itemButtons:ToolbarItemInput[];

    onCheckedChanged(checked:boolean):void;
}

export default function Toolbar(props:Props)
{
    function onChecked(event: React.ChangeEvent<HTMLInputElement>, checked: boolean):void
    {
        props.onCheckedChanged(checked);
    }

    return(
        <div className="toolbar-body">
            {
                props.itemGroups.map((item:ToolbarItemInput, index) => 
                (                    
                    <ToolbarItemGroup 
                        title = {item.title}
                        names={item.entries}
                        activeIndex={item.defaultIndex}
                        setIndex={item.onIndexChanged}
                    /> 
                ))
            }         
            {
                props.itemButtons.map((item:ToolbarItemInput, index) => 
                (                    
                    <ToolbarItemButton 
                        title = {item.title}
                        names={item.entries}
                        activeIndex={item.defaultIndex}
                        setIndex={item.onIndexChanged}
                    /> 
                ))
            }

            <div className="checkbox-body">
                <Checkbox
                    onChange={onChecked}
                    color="primary"/
                >
                <div className="checkbox-text">Animate</div>
            </div>
        </div>
    )
}
