import './Styling/WebsiteMain.css'

//react imports
import { Component } from 'react';
import React, {useState} from 'react'

//external imports
import LineGraphChart from './LineGraph'
import InputDataProcessor from './Logic/InputDataProcessor.js';
import UserCollection from './Logic/UserCollection.js'

//test imports
import SelectionContainer from './SelectionContainer.js'
import DataContainer from './Components/DataContainer.js'

let userCollection = new UserCollection();

function WebsiteMain() {
  const [input, setInput] = useState([0]);
  const [dates, setDates] = useState([""]);
  const [userName, setUserName] = useState("");
  const [userEntries, setUserEntries] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date().toISOString().substring(0, 10));

  function processUserSelection(userName)
  {
    //Update the user name
    setUserName(userName);

    //Update the entries associated with that user name
    let activeUser = userCollection.getUser(userName);
    if(activeUser!==null)
    {
      setUserEntries(activeUser.getDistancesOnDate(activeDate));
    }
  }

  function updateData()
  {
    //Go through all users in the user collection

    //For each user, create a combination package consisting of:
    //- labels
    //- cumulatives per date

    //We need an object that handles all input + date combinations
    //These combinations then need to be transformed into a set of labels and inputs for the graph
    let processor = new InputDataProcessor();

    for(let i=0;i<userCollection.users.length;i++)
    {
        let user = userCollection.users[i];
        for(let d=0;d<user.dateEntries.length;d++)
        {
          let dateEntry = user.dateEntries[d];

          let date = dateEntry.date;

          for(let j=0;j<dateEntry.exerciseEntries.length;j++)
          {
              processor.addDataEntry(dateEntry.exerciseEntries[j].distance, date);
          }
        }
    }

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

  return (
  <div>
    <div className="UserContainer">
      <div className="PersonEntry">
        <SelectionContainer items={userCollection.getUserNames()} processUserSelect={processUserSelection}/>
      </div>
      {
        userName.length > 0 &&
        <div>
          <DataContainer 
            user={userCollection.getUser(userName)}
            userEntries={userEntries}
            setUserEntries={setUserEntries}
            activeDate={activeDate}
            setActiveDate={setActiveDate}
            updateData={updateData}
          />
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
