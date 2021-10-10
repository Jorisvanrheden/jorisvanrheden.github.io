import {useState} from 'react'

//component imports
import NavigationGrid from "../../Components/NavigationGrid/NavigationGrid"

//Logic imports
import Grid from "../../Logic/Pathfinding/Grid";
import { GridModel } from '../../Logic/Pathfinding/GridModel';

interface Props
{
  gridModel:GridModel;
}

export default function GridEnvironment(props:Props)
{  
  const [index, setIndex] = useState(0);

  function setType(index:number)
  {
    setIndex(index);
  }

  return(
    <NavigationGrid 
      gridModel={props.gridModel} 
      activeType={index}
      setType={setType}/>
  )  
}