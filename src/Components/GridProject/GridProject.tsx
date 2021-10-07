import "./GridProject.css"

import Toolbar from "../../Components/Toolbar/Toolbar"
import GridEnvironment from "../../Components/GridEnvironment/GridEnvironment"

export default function GridProject()
{
    return(
        <div className="grid-container">
            <div id="control-panel">
                <Toolbar/>
            </div>
            <div id="display">
                <GridEnvironment/>
            </div>
        </div>
    )
}