//material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

import './WebsiteMain.css'

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    default: {
      margin: theme.spacing(3, 0, 1, 0),
      backgroundColor: theme.palette.common.white,
    },
    sectionColumnRight: {
      width: '50%',
      float: 'right',
      margin: theme.spacing(3, 2),
      backgroundColor: 'lightGray',
    },
    section1: {
      margin: theme.spacing(3, 2),
    },
    section3: {
      margin: theme.spacing(3, 1, 1),
    },
  }));

export default function DataContainer(props) {
  const classes = useStyles();

  function addEntry()
  {
    props.user.addEntry(props.activeDate);

    //update the state variable
    props.setUserEntries(props.user.getDistancesOnDate(props.activeDate));
  }

  function confirmInput(index, value)
  {
    props.user.setDistance(props.activeDate, index, value)

    //props.updateData();
    props.setUserEntries(props.user.getDistancesOnDate(props.activeDate));
  }

  function processDateChange(date)
  {
    props.setActiveDate(date);

    //update the state variable
    props.setUserEntries(props.user.getDistancesOnDate(date));
  }

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Typography color="textSecondary" variant="body2">
          Entry overview for {props.user.name}
        </Typography>
      </div>
      <div className="ColumnLeft">
      {
        props.userEntries.length === 0 &&

        <div className="DataEntryStyle">
          <Typography color='primary' variant="body2">
            No entries yet for {props.user.name}
          </Typography>
        </div>
      }
      </div>

      <div className="ColumnLeft">
      {
        props.userEntries.map((value, index) => 
        (
          <DataRow name={props.user.name} confirmInput={confirmInput} distance={value} index={index}/>
        ))
      }
      </div>
      
      <div className="ColumnRight">
        <DataInput addEntry={addEntry} activeDate={props.activeDate} processDateChange={processDateChange}/>
      </div>
    </div>
  );
}

function DataInput(props)
{
  return(
    <div className="DataAddStyle">
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

function DataRow(props)
{
  let textFieldValue = props.distance;

  return(
    <div className="DataEntryStyle">
      <p>{props.name}</p>
        <TextField label="Distance" 
          InputProps={{
            endAdornment: <InputAdornment position="start">km</InputAdornment>,
          }}
          defaultValue={props.distance}
          onChange={event => 
          {
            textFieldValue = event.target.value;
          }}
          onKeyPress={event => 
          {
            if (event.key === 'Enter') {
              console.log('Enter key pressed');
              // write your functionality here
              props.confirmInput(props.index, textFieldValue)
            }
          }}
        /> 
    </div>     
  )
}