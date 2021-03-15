import React, { useState } from 'react';

//material-ui imports
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 500,
      backgroundColor: theme.palette.background.paper,
    },
    default: {
      margin: theme.spacing(3, 0, 1, 0),
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

  const [entries, setEntries] = useState([]);

  function addEntry()
  {
    props.userCollection.addDataEntry(props.user, new Date(), 0, "");

    //setEntries(entries.concat(1));
  }

  return (
    <div className={classes.root}>
      <div className={classes.section1}>
        <Typography color="textSecondary" variant="body2">
          Entry overview for {props.user}
        </Typography>
      </div>
      {
        props.userCollection.getDataEntry(props.user).map((value, index) => 
        (
          <DataRow/>
        ))
      }
      <div className={classes.section3}>
        <Button color="primary" onClick={addEntry}>Add new entry </Button>
      </div>
    </div>
  );
}

function DataRow(props)
{
  const classes = useStyles();

  let textFieldValue = "";
  let textFieldDate = new Date().toISOString().substring(0, 10);

  return(
    <div className={classes.root}>
      <div className={classes.section1}>
        <TextField label="Distance" 
          InputProps={{
            endAdornment: <InputAdornment position="start">km</InputAdornment>,
          }}
          style={{ width: 140 }}
          onChange={event => 
          {
            textFieldValue = event.target.value;
          }}
        />
        <TextField
          type="date"
          defaultValue={textFieldDate}
          style={{ width: 140 }}
          onChange={event => 
          {
            textFieldDate = event.target.value;
          }}
        />
      </div>    
    </div>     
  )
}