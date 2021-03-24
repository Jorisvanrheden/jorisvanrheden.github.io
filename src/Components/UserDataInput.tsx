import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

interface Props
{
  date:string;

  processDateChange:(date:string)=>void;
  addEntry:()=>void;
}

function UserDataInput(props:Props)
{
  return(
    <div className="DataInputStyle">
      <Typography color="textSecondary" variant="body2">
        Add entries for the selected date
      </Typography>

      <Grid container alignItems="center">
          <Grid item xs>
          <TextField
        type="date"
        defaultValue={props.date}
        onChange={event => 
        {
          props.processDateChange(event.target.value);
        }}
      /> 
          </Grid>
          <Grid item>
          <Button 
        color="primary" 
        style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}}          
        variant="contained" 
        onClick={props.addEntry}>
            Add
        </Button>
          </Grid>
        </Grid>
      
     
    </div>
  )
}

export default UserDataInput