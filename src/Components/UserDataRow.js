import React, {useState} from 'react'

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import Grid from '@material-ui/core/Grid';

function UserDataRow(props)
{
  const [distance, setDistance] = useState(props.distance);

  return(
    <div className="DataEntryStyle">

        <Grid container alignItems="center">
          <Grid item xs>
          <TextField label="Distance" 
          InputProps={{
            endAdornment: <InputAdornment position="start">km</InputAdornment>,
          }}
          value={distance}
          onChange={event => 
          {
            setDistance(event.target.value);

            props.confirmInput(props.index, event.target.value)
          }}
        /> 
          </Grid>
          <Grid item>
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
          </Grid>
        </Grid>
    </div>     
  )
}

export default UserDataRow;