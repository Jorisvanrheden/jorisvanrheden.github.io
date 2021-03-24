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

interface Props
{
  user:string;
  date:string;
  entries:Array<number>;

  addEntry:(user:string)=>void;
  removeEntry:(user:string, index:number)=>void;
  modifyEntry:(user:string, index:number, input:number)=>void;
  modifyDate:(user:string, date:string)=>void;
}

export default function DataContainer(props:Props) {
  const classes = useStyles();

  function addEntry()
  {
    props.addEntry(props.user);
  }

  function removeEntry(index:number)
  {
    props.removeEntry(props.user, index);  
  }

  function confirmInput(index:number, value:number)
  {
    let input = Number(value);
    if(isNaN(input)) return;

    props.modifyEntry(props.user, index, input);
  }

  function processDateChange(date:string)
  {
    props.modifyDate(props.user, date);
  }

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Typography color="textSecondary" variant="body2">
          Entry overview for {props.user}:
        </Typography>
      </div>

      <div className="AreaInputNew">
        <div className="UserEntriesContainer">
          <UserDataInput addEntry={addEntry} date={props.date} processDateChange={processDateChange}/> 
          
          {
          props.entries.length === 0 &&

          <div className="DataEntryStyle">
            <Typography color='primary' variant="body2">
              No entries yet for {props.user} on {props.date}
            </Typography>
          </div>
        }       
        {
          props.entries.map((value:number, index:number) => 
          (
            <UserDataRow 
              confirm={confirmInput} 
              remove={removeEntry}
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