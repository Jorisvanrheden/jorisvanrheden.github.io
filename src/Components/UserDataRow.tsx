import React, {useState} from 'react'

import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';

interface Props
{
  data:any;
  index:number;

  remove:()=>void;
  confirm:(type:string, value:number)=>void;
}

function UserDataRow(props:Props)
{
  const [distance, setDistance] = useState(props.data.v);

  const description = "Distance" + " [" + props.data.p + "]";

  return(
    <div className="DataEntryStyle">

        <Grid container alignItems="center">
          <Grid item xs>
          <TextField label={description}
          InputProps={{
            endAdornment: <InputAdornment position="start">km</InputAdornment>,
          }}
          value={distance}
          onChange={event => 
          {
            let changedValue:number = Number(event.target.value);

            setDistance(changedValue);

            props.confirm(props.data.p, changedValue)
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
              props.remove();
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