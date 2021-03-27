import './Styling/WebsiteMain.css'

//react imports
import React, {useState} from 'react'

//external imports
import LineGraphChart from './LineGraph'
import InputDataProcessor from './Logic/InputDataProcessor';
import DataBaseOnline from './Logic/DB/DataBaseOnline'

//test imports
import SelectionContainer from './SelectionContainer'
import DataContainer from './Components/DataContainer'

let userDataBase = new DataBaseOnline();

let USER_CACHE = "";
let DATE_CACHE = "";

function WebsiteMain() {
  const [input, setInput] = useState([0]);
  const [dates, setDates] = useState([""]);
  const [userName, setUserName] = useState("");
  const [userNames, setUserNames] = useState([]);
  const [userEntries, setUserEntries] = useState([]);
  const [activeDate, setActiveDate] = useState(new Date().toISOString().substring(0, 10));
  const [dataLoaded, setDataLoaded] = useState(false);

  if(!dataLoaded)
  {
    //Initialization flag

    USER_CACHE = userName;
    DATE_CACHE = activeDate;

    //What to initialize:
    //- UserDataBase (maybe even return an entire UserDataBase)
    //- Return an EMTPY database, and then let the callback populate the object
    //- use a useState to redraw the page

    userDataBase.init(updateData);

    setDataLoaded(true);
  }

  function processUserSelection(name)
  {
    USER_CACHE = name;

    //Update the user name
    setUserName(name);
    
    //Only read out data from the cache, as user selection does not change the database
    let values = userDataBase.databaseCache.getEntries(name, activeDate);
    // setUserEntries(activeUser.getDistancesOnDate(activeDate));
  }

  function updateData()
  {
    let names = userDataBase.databaseCache.getUserNames();
    setUserNames(names);

    return;
    //Updating the GUI
    // let userEntries = userDataBase.databaseCache.processValueQuery
    // setUserEntries(activeUser.getDistancesOnDate(DATE_CACHE));

    //Go through all users in the user collection

    //For each user, create a combination package consisting of:
    //- labels
    //- cumulatives per date

    //We need an object that handles all input + date combinations
    //These combinations then need to be transformed into a set of labels and inputs for the graph
    let processor = new InputDataProcessor();

    for(let i=0;i<userDataBase.databaseCache.users.length;i++)
    {
        let user = userDataBase.databaseCache.users[i];
        for(let d=0;d<user.userDates.length;d++)
        {
          let dateEntry = user.userDates[d];
          let date = dateEntry.date;
          let distances = dateEntry.values;

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
    userDataBase.add(user, activeDate);
  }

  function removeEntry(user)
  {
    userDataBase.remove(user, activeDate);
  }

  function modifyEntry(user, index, value)
  {
    userDataBase.edit(user, activeDate, index, value);
  }

  function modifyDate(user, date)
  {
    DATE_CACHE = date;

    setActiveDate(date);

    userDataBase.update();
  }

  return (
  <div>
    <div className="UserContainer">
      <div className="PersonEntry">
        {
          dataLoaded &&
          <SelectionContainer items={userNames} processUserSelect={processUserSelection}/>
        }
      </div>
      {
        userName.length > 0 &&
        <div>
          <DataContainer 
            user={userName}
            entries={userEntries}
            date={activeDate}
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
