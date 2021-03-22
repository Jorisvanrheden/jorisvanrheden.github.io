import DataBaseCache from "./DataBaseCache";

//data base testing
import {firebase} from '../../Database/FireBaseSetup.js'
let database = firebase.database();

export default class DataBaseOnline
{
    constructor()
    {
        //Store a local cached version of the database, since there is no way to directly access data
        //The only way is to asynchronously call the database, where callbacks trigger the update

        this.databaseCache = new DataBaseCache(); 
    }

    triggerValueUpdate(snapshot, callback)
    {
        let database = new DataBaseCache();

        console.log("updating dataa....");

        if(snapshot.exists())
        {
            snapshot.forEach(function(child) {
                //names
                let name = child.key;

                //dates
                child.forEach(function(sub)
                {
                    let date = sub.key;
                    
                    let items = sub.val();
                    for(let i=0;i<items.length;i++)
                    {
                        let value = items[i];
                        
                        //Insert value
                        database.add(name, date, value);
                    }
                });
            });
        }

        this.databaseCache = database;
                
        callback();
    }

    init(callback)
    {
        this.callback = callback;

        let userDateInput = database.ref("users");
        userDateInput.on('value', (snapshot) => {
            this.triggerValueUpdate(snapshot, callback);
        });
    }

    add(name, date, value)
    {
        console.log("ONLINE- > add");
        console.log(name + " " + date + " " + value);

        let userDateInput = database.ref("users/" + name + "/" + date);
        
        userDateInput.get().then(function(snapshot) {

            //Emtpy array in case no entry exists yet
            let data = [];

            if (snapshot.exists()) {
              //Store cache with new data
              data = snapshot.val();
            }

            //Add the item to the collection
            data.push(value);
            
            //Update the database value
            userDateInput.set(data);
          }).catch(function(error) {
            console.error(error);
          });
    }

    remove(name, date, index)
    {
        console.log("ONLINE- > remove");

        let userDateInput = database.ref("users/" + name + "/" + date);

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

    edit(name, date, index, value)
    {
        let userDateInput = database.ref("users/" + name + "/" + date);

        userDateInput.get().then(function(snapshot) {
            if (snapshot.exists()) {
              //Store cache with new data
              let data = snapshot.val();

              if(index < data.length)
              {
                  data[index] = value;
              }

              userDateInput.set(data);
            }
          }).catch(function(error) {
            console.error(error);
          });
    }

    update()
    {
        this.callback();
    }
}