import './WebsiteMain.css';

//react imports
import { Component } from 'react';
import React, {useState} from 'react'

//external imports
import LineGraphChart from './LineGraph'
import InputDataProcessor from './InputDataProcessor.js';
import UserCollection from './UserCollection.js'

//test imports
import SelectionContainer from './SelectionContainer.js'
import DataContainer from './DataContainer.js'

//We need an object that handles all input + date combinations
//These combinations then need to be transformed into a set of labels and inputs for the graph
let processor = new InputDataProcessor();

let userCollection = new UserCollection();

class AddEntry extends Component
{
  constructor(props)
  {
    super(props);

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
}

function WebsiteMain() {
  const [input, setInput] = useState([0]);
  const [dates, setDates] = useState([""]);
  const [user, setUser] = useState("");

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

    setInput(processorInput);
    setDates(processorDates);
  }

  function processUserSelection(userName)
  {
    setUser(userName);
  }

  return (
  <div>
    <div className="UserContainer">
      <div className="PersonEntry">
        <SelectionContainer items={userCollection.getUserNames()} processUserSelect={processUserSelection}/>
      </div>
      {
        user.length > 0 &&
        <div>
          <DataContainer processItem={processInput} userCollection={userCollection} user={user}/>
        </div>      
      }
    </div>
    <div className="GraphContainer">
      <LineGraphChart data={input} dates={dates}/>
    </div>     
  </div>
  );
}

export default WebsiteMain;
