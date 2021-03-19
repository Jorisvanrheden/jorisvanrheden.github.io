import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function UserDataInput(props)
{
  return(
    <div className="DataInputStyle">
      <Typography color="textSecondary" variant="body2">
        Add entries for the selected date
      </Typography>

      <TextField
        type="date"
        defaultValue={props.activeDate}
        onChange={event => 
        {
          props.processDateChange(event.target.value);
        }}
      />
      <Button 
        color="primary" 
        style={{maxWidth: '100px', maxHeight: '30px', minWidth: '100px', minHeight: '30px'}}          
        variant="contained" 
        onClick={props.addEntry}>
            Add
        </Button>
    </div>
  )
}

export default UserDataInput