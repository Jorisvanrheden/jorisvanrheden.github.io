import './Styling/WebsiteMain.css'

//react imports
import React, {useState} from 'react'

//external imports
import LineGraphChart from './LineGraph'
import InputDataProcessor from './Logic/InputDataProcessor.js';
import UserDataBase from './Logic/UserDataBase.js'

//test imports
import SelectionContainer from './SelectionContainer.js'
import DataContainer from './Components/DataContainer.js'

let userDataBase = new UserDataBase();

function WebsiteMain() {
  const [input, setInput] = useState([0]);
  const [dates, setDates] = useState([""]);
  const [userName, setUserName] = useState("");
  const [userEntries, setUserEntries] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date().toISOString().substring(0, 10));
  const [dataLoaded, setDataLoaded] = useState(false);

  //TODO: use the dataLoaded flag to determine whether anything can be drawn to the screen
  if(!dataLoaded)
  {
    //Initialization flag

    //What to initialize:
    //- UserDataBase (maybe even return an entire UserDataBase)
    //- Return an EMTPY database, and then let the callback populate the object
    //- use a useState to redraw the page

    userDataBase.init(updateData);

    //TODO: only execute this in the initalization callback
    setDataLoaded(true);
  }
  //userDataBase.init(updateData);


  function processUserSelection(userName)
  {
    //Update the user name
    setUserName(userName);

    //Update the entries associated with that user name
    let activeUser = userDataBase.getUser(userName);
    if(activeUser!==null)
    {
      activeUser.update(activeDate);
    }
  }

  function updateData()
  {
    //TODO: refactor into maybe a different callback
    let activeUser = userDataBase.getUser(userName);
    if(activeUser!==null)
    {
      setUserEntries(activeUser.getDistancesOnDate(activeDate));
    }

    //Go through all users in the user collection

    //For each user, create a combination package consisting of:
    //- labels
    //- cumulatives per date

    //We need an object that handles all input + date combinations
    //These combinations then need to be transformed into a set of labels and inputs for the graph
    let processor = new InputDataProcessor();

    for(let i=0;i<userDataBase.users.length;i++)
    {
        let user = userDataBase.users[i];
        for(let d=0;d<user.dateEntries.length;d++)
        {
          let dateEntry = user.dateEntries[d];
          let date = dateEntry.date;
          let distances = dateEntry.getDistances();

          for(let j=0;j<distances.length;j++)
          {
              processor.addDataEntry(distances[j], date);
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

  function addEntry(user)
  {
    user.addEntry(activeDate);
  }

  function removeEntry(user, index)
  {
    user.removeEntry(activeDate, index);
  }

  function modifyEntry(user, index, value)
  {
    user.setDistance(activeDate, index, value)
  }

  function modifyDate(user, date)
  {
    setActiveDate(date);

    user.update(date);
  }

  return (
  <div>
    <div className="UserContainer">
      <div className="PersonEntry">
        <SelectionContainer items={userDataBase.getUserNames()} processUserSelect={processUserSelection}/>
      </div>
      {
        userName.length > 0 &&
        <div>
          <DataContainer 
            user={userDataBase.getUser(userName)}
            userEntries={userEntries}
            activeDate={activeDate}
            removeEntry={removeEntry}
            addEntry={addEntry}
            modifyEntry={modifyEntry}
            modifyDate={modifyDate}
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
