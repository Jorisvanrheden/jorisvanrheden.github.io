import React from 'react';

//material-ui imports
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Divider from '@material-ui/core/Divider';

const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      maxWidth: 360,
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
  
  export default function SelectionContainer(props) {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <div className={classes.section1}>
          <div className={classes.default}>
          <InputLabel>Select the active user</InputLabel>
          </div>

          <Select
            style={{ width: 160 }}
            onChange={(event) => {
              props.processUserSelect(event.target.value);
            }}
          >
            {
              props.items.map((value, index) => 
              (
                <MenuItem value={value}>{value}</MenuItem>
              ))
            }
          </Select>
        </div>
        <Divider variant="middle" />
      </div>
    );
  }