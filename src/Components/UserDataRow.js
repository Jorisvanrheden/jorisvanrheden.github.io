import React, {useState} from 'react'

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

function UserDataRow(props)
{
  const [distance, setDistance] = useState(props.distance);

  return(
    <div className="DataEntryStyle">
        <TextField label="Distance" 
          InputProps={{
            endAdornment: <InputAdornment position="start">km</InputAdornment>,
          }}
          value={distance}
          onChange={event => 
          {
            console.log("Setting the value to " + event.target.value);
            setDistance(event.target.value);
          }}
          onKeyPress={event => 
          {
            if (event.key === 'Enter') {
              console.log('Enter key pressed');
              // write your functionality here
              props.confirmInput(props.index, distance)
            }
          }}
        /> 
    </div>     
  )
}

export default UserDataRow;