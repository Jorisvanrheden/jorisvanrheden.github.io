//data base testing
import {firebase} from '../Database/FireBaseSetup.js'
let database = firebase.database();

//- Get the users entry
        //- Find if the current user already has an entry
        // let user = database.ref("users/" + name);
        // user.update({
        //     data: [1,2,3]
        //   });

export default class UserEntryDB
{
    constructor(date, name)
    {
        this.date = date;
        this.name = name;
        this.dataCache = [];

        let userDateInput = database.ref("users/" + this.name + "/" + this.date);
        userDateInput.on('value', (snapshot) => {
            const data = snapshot.val();
            this.dataCache = data;

            console.log("Data is updated");
            console.log(data);
        });
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

    getDistances()
    {
        return this.dataCache;
    }
}