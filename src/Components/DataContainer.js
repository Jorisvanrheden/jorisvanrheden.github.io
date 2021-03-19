//material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import UserDataInput from './UserDataInput'
import UserDataRow from './UserDataRow'

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
      margin: theme.spacing(2, 2),
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
    let input = Number(value);
    if(isNaN(input)) return;

    props.user.setDistance(props.activeDate, index, input)

    props.updateData();
  }

  function removeEntry(index)
  {
    props.user.removeEntry(props.activeDate, index);

    props.setUserEntries(props.user.getDistancesOnDate(props.activeDate));

    props.updateData();
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
          Entry overview for {props.user.name}:
        </Typography>
      </div>

      <div className="AreaInputNew">
        <div className="UserEntriesContainer">
          <UserDataInput addEntry={addEntry} activeDate={props.activeDate} processDateChange={processDateChange}/> 
          
          {
          props.userEntries.length === 0 &&

          <div className="DataEntryStyle">
            <Typography color='primary' variant="body2">
              No entries yet for {props.user.name} on {props.activeDate}
            </Typography>
          </div>
        }
          
          {
            props.userEntries.map((value, index) => 
            (
              <UserDataRow 
                name={props.user.name} 
                confirmInput={confirmInput} 
                removeEntry={removeEntry}
                distance={value} 
                index={index}
              />
            ))
          }  
        </div>
      </div>
    </div>
  );
}