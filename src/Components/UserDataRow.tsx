import React, {useState} from 'react'

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

interface Props
{
  distance:number;
  index:number;

  remove:(index:number)=>void;
  confirm:(index:number, value:number)=>void;
}

function UserDataRow(props:Props)
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
            let changedValue:number = Number(event.target.value);

            setDistance(changedValue);

            props.confirm(props.index, changedValue)
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
              props.remove(props.index);
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