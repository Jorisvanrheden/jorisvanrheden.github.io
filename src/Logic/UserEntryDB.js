//data base testing
import {firebase} from '../Database/FireBaseSetup.js'
let database = firebase.database();

export default class UserEntryDB
{
    constructor(date, name, callback)
    {
        this.date = date;
        this.name = name;
        this.dataCache = [];

        let userDateInput = database.ref("users/" + this.name + "/" + this.date);
        userDateInput.on('value', (snapshot) => {
            this.triggerValueUpdate(snapshot, callback);
        });
    }

    triggerValueUpdate(snapshot, callback)
    {
        let fetchedData = snapshot.val();

        console.log("Data trigger");

        if(snapshot.exists())
        {
            this.dataCache = fetchedData;
        }
        else
        {
            this.dataCache = [];
        }
        
        callback();
    }


    setDistance(index, distance)
    {        
       
    }

    getDistances()
    {
        return this.dataCache;
    }
}