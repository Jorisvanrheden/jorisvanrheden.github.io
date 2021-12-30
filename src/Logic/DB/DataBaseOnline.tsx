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
        userDateInput.on('value', (snapshot:any) => {
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
 
        userDateInput.get().then(function(snapshot:any) {
            if (!snapshot.exists()) {
              //Only add an entry if it doesn't exist yet
              let data =     
                {
                  "Walking": 0,
                  "Biking": 0,
                  "Other": 0
                }            

              //Update the database value
              userDateInput.set(data);
            }         
            
          }).catch(function(error:any) {
            console.error(error);
          });
    }

    remove(name:string, date:string)
    {
        let userDateInput = database.ref();

        userDateInput.get().then(function(snapshot:any) {
            if (snapshot.exists()) {
              userDateInput.child("users/" + name + "/dates/" + date).remove();
            }
          }).catch(function(error:any) {
            console.error(error);
          });
    }

    edit(name:string, date:string, type:string, value:number)
    {
        let userDateInput = database.ref("users/" + name + "/dates/" + date + "/" + type);

        userDateInput.get().then(function(snapshot:any) {
            if (snapshot.exists()) {
              
              //Set the value
              userDateInput.set(value);
            }
          }).catch(function(error:any) {
            console.error(error);
          });
    }

    update()
    {
        this.callback();
    }
}