import React from 'react';

//material-ui imports
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';

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
          <Grid container alignItems="center">
            <Grid item xs>
              <Typography gutterBottom variant="h4">
                Logging Tool 
              </Typography>
            </Grid>
          </Grid>
          <Typography color="textSecondary" variant="body2">
            Select the active user, as only the selected user is able to change their data in the bottom overview
          </Typography>

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