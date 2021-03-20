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
        this.callback = callback;

        let userDateInput = database.ref("users/" + this.name + "/" + this.date);
        userDateInput.on('value', (snapshot) => {
            this.triggerValueUpdate(snapshot);
        });
    }

    triggerValueUpdate(snapshot)
    {
        let fetchedData = snapshot.val();
        console.log("Getting data: " + fetchedData);

        if(snapshot.exists())
        {
            this.dataCache = fetchedData;
        }
        else
        {
            this.dataCache = [];
        }

        this.callback();
    }

    addExerciseEntry(distance, photo)
    {
        let userDateInput = database.ref("users/" + this.name + "/" + this.date);
        
        userDateInput.get().then(function(snapshot) {

            //Emtpy array in case no entry exists yet
            let data = [];

            if (snapshot.exists()) {
              //Store cache with new data
              data = snapshot.val();
            }

            //Add the item to the collection
            data.push(distance);
            
            //Update the database value
            userDateInput.set(data);
          }).catch(function(error) {
            console.error(error);
          });
    }

    setDistance(index, distance)
    {        
        let userDateInput = database.ref("users/" + this.name + "/" + this.date);

        userDateInput.get().then(function(snapshot) {
            if (snapshot.exists()) {
              //Store cache with new data
              let data = snapshot.val();

              if(index < data.length)
              {
                  data[index] = distance;
              }

              userDateInput.set(data);
            }
          }).catch(function(error) {
            console.error(error);
          });
    }

    removeEntry(index)
    {
        console.log("Removing...");
        let userDateInput = database.ref("users/" + this.name + "/" + this.date);

        userDateInput.get().then(function(snapshot) {
            if (snapshot.exists()) {
              //Store cache with new data
              let data = snapshot.val();

              if(index < data.length)
              {
                  data.splice(index, 1);
              }

              userDateInput.set(data);
            }
          }).catch(function(error) {
            console.error(error);
          });
    }

    update()
    {
      console.log("updating");
        let userDateInput = database.ref("users/" + this.name + "/" + this.date);
        
        userDateInput.get().then(function(snapshot) {
            if (snapshot.exists()) {
              //Store cache with new data
              let data = snapshot.val();

              //Trigger event by manually setting the same data one more time
              userDateInput.set(data);
            }
          }).catch(function(error) {
            console.error(error);
          });
    }

    getDistances()
    {
        return this.dataCache;
    }
}