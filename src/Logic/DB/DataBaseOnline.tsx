import DataBaseCache from "./DataBaseCache";

//data base testing
import {firebase} from '../../Database/FireBaseSetup.js'
let database = firebase.database();

export default class DataBaseOnline
{
    databaseCache:DataBaseCache = new DataBaseCache("");
    callback:any = null;

    lastUser:string = "";
    lastDate:string = "";

    init(callback:any)
    {
        this.callback = callback;

        let userDateInput = database.ref();
        userDateInput.on('value', (snapshot) => {
            this.triggerValueUpdate(snapshot, callback);
        });
    }

    triggerValueUpdate(snapshot:any, callback:()=>void)
    {
        let jsonString = "";
        if(snapshot.exists())
        {
            jsonString = JSON.stringify(snapshot.val());            
        }

        let database = JSON.parse(jsonString);
        console.log(database);

        this.databaseCache = new DataBaseCache(database);
                
        callback();
    }

    add(name:string, date:string)
    {
        //Adding an item to the database should add 3 entries:
        //- Walking
        //- Biking
        //- Other
        let userDateInput = database.ref("users/" + name + "/" + "dates/" + date);
 
        userDateInput.get().then(function(snapshot) {
            if (!snapshot.exists()) {
              //Only add an entry if it doesn't exist yet
              let data =     
                {
                  "walking": 0,
                  "biking": 0,
                  "other": 0
                }            

              //Update the database value
              userDateInput.set(data);
            }
            
            
          }).catch(function(error) {
            console.error(error);
          });
    }

    remove(name:string, date:string)
    {
        let userDateInput = database.ref("users/" + name + "/" + date);

        userDateInput.get().then(function(snapshot) {
            if (snapshot.exists()) {
              //Only remove the entry if it exists
              let data = snapshot.val();
              userDateInput.remove(data);
            }
          }).catch(function(error) {
            console.error(error);
          });
    }

    edit(name:string, date:string, index:number, value:number)
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