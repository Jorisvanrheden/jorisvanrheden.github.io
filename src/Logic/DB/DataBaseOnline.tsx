import DataBaseCache from "./DataBaseCache";

//data base testing
import {firebase} from '../../Database/FireBaseSetup.js'
let database = firebase.database();

export default class DataBaseOnline
{
    databaseCache:DataBaseCache = new DataBaseCache();
    callback:any = null;

    lastUser:string = "";
    lastDate:string = "";

    init(callback:any)
    {
        this.callback = callback;

        let userDateInput = database.ref("users");
        userDateInput.on('value', (snapshot) => {
            this.triggerValueUpdate(snapshot, callback);
        });
    }

    triggerValueUpdate(snapshot:any, callback:()=>void)
    {
        let database = new DataBaseCache();

        if(snapshot.exists())
        {
            snapshot.forEach(function(child:any) {
                //names
                let name = child.key;

                //dates
                child.forEach(function(sub:any)
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

    add(name:string, date:string, value:number)
    {
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

    remove(name:string, date:string, index:number)
    {
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