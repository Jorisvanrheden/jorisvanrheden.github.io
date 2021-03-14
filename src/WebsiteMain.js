import './WebsiteMain.css';
import { Component } from 'react';
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import LineGraphChart from './LineGraph'

class AddEntry extends Component
{
  constructor(props)
  {
    super(props);

    console.log(props);

    this.state =
    {
      textFieldValue: ""
    };
  }

  addValue()
  {
    console.log("Button pressed");

    this.props.processItem(this.state.textFieldValue);
  }

  render()
  {
    return(
      <div>
      <div className="StandardDiv">
        <h3>Add a new distance</h3> 
      </div>
      <div className="StandardDiv">
        <TextField id="standard-basic" label="Distance (km)" 
          onChange={event => 
            {
              this.setState({textFieldValue: event.target.value});
            }}
        />
        <TextField
        id="date"
        label="Date"
        type="date"
        defaultValue={new Date().toISOString().substring(0, 10)}
        InputLabelProps={{
          shrink: true,
        }}
      />
      </div>
      <div className="StandardDiv">
        <Button variant="contained" color="regular" onClick={event => 
            {
              this.addValue();
            }}>Add distance</Button>
      </div>
      </div>   
    )
  }
}

class RegisterPerson extends Component
{
  render()
  {
    return(
      <div>
      <div className="StandardDiv">
        <h2>Personal Entry</h2> 
      </div>
      <div className="StandardDiv">
        <TextField id="outlined-basic" label="Name" variant="outlined"/>
      </div>
      <div className="StandardDiv">
        <Button variant="contained" color="regular">Add user</Button>
      </div>
      </div>   
    )
  }
}

function WebsiteMain() {
  const [input, setInput] = useState([0]);

  function addPoint()
  {
    let addition = Math.floor(Math.random() * 30);
    setInput(input.concat(addition));
  }

  function addNewItem(value)
  {
    let number = parseFloat(value);
    console.log(number);

    if(!isNaN(number))
    {
      setInput(input.concat(number));
    }
  }

  return (
    <div className="GraphContainer">
      <LineGraphChart data={input}/>

      <div className="PersonEntry">
        <RegisterPerson/>
      </div>

      <Button variant="contained" color="regular" onClick={addPoint}>Add data point</Button>
      <AddEntry processItem={addNewItem}/>
    </div>
  );
}

export default WebsiteMain;
