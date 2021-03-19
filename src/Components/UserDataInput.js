import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

function UserDataInput(props)
{
  return(
    <div className="DataInputStyle">
      <Typography color="textSecondary" variant="body2">
        Select a date and press the button to insert a new entry
      </Typography>

      <TextField
        type="date"
        defaultValue={props.activeDate}
        onChange={event => 
        {
          props.processDateChange(event.target.value);
        }}
      />
      <Button color="primary" onClick={props.addEntry}>Add new entry </Button>
    </div>
  )
}

export default UserDataInput