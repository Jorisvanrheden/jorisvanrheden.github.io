import React, {useState} from 'react'

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

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

        <Button 
          style={{maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px'}}          
          color="secondary" 
          variant="contained" 
          onClick={event => 
          {
              props.removeEntry(props.index);
          }}
        >
          X
        </Button>
    </div>     
  )
}

export default UserDataRow;