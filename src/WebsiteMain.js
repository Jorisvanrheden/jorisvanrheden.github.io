import './WebsiteMain.css';
import { Component } from 'react';
import React, {useState} from 'react'
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import LineGraphChart from './LineGraph'
import InputDataProcessor from './InputDataProcessor.js';


class AddEntry extends Component
{
  constructor(props)
  {
    super(props);

    console.log(props);

    this.state =
    {
      textFieldValue: "",
      textFieldDate: new Date().toISOString().substring(0, 10)
    };
  }

  addValue()
  {
    this.props.processItem(this.state.textFieldValue, this.state.textFieldDate);   
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
        defaultValue={this.state.textFieldDate}
        InputLabelProps={{
          shrink: true,
        }}
        onChange={event => 
          {
            this.setState({textFieldDate: event.target.value});
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

//We need an object that handles all input + date combinations
//These combinations then need to be transformed into a set of labels and inputs for the graph
let processor = new InputDataProcessor();

function WebsiteMain() {
  const [input, setInput] = useState([0]);
  const [dates, setDates] = useState([""]);

  function processInput(value, date)
  {
    let number = parseFloat(value);
    if(isNaN(number)) return;

    //add entry
    processor.addDataEntry(number, date);

    //create input list for graph
    let processorDates = processor.getDates();
    let processorInput = [];

    for(let i=0;i<processorDates.length;i++)
    {
      processorInput[i] = processor.getAdditionOnDate(processorDates[i]);
    }

    for(let i=0;i<processorDates.length;i++)
    {
      processorDates[i] = processor.getDateLabel(processorDates[i]);
    }

    console.log(processorDates);

    setInput(processorInput);
    setDates(processorDates);
  }

  const arr = [1,2,4];
  

  return (
  <div>
    <div className="UserContainer">
      <div className="PersonEntry">
        <RegisterPerson/>
      </div>
      <AddEntry processItem={processInput}/>
      {
        arr.map((value, index) => 
        (
          <p>This is how we can display multiple items dynamically</p>
        ))
      }
    </div>
    <div className="GraphContainer">
      <LineGraphChart data={input} dates={dates}/>
    </div>     
  </div>
  );
}

export default WebsiteMain;
