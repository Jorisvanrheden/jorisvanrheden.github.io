import UserData from './UserData.js'

//linking data storage
//local
import LocalStorage from './LocalStorage.js'
//database
import DBStorage from './DBStorage.js'

export default class UserDataBase
{
    constructor()
    {
        this.users = 
        [
            new UserData("Joris"),
            new UserData("Minyu"),
            new UserData("New User")
        ]; 
    }

    init(callback)
    {
        const storage = new DBStorage(callback);
        //const storage = new LocalStorage(callback);

        for(let i=0;i<this.users.length;i++)
        {
            this.users[i].initStorage(storage);
        }
    }

    getUser(name)
    {
        for(let i=0;i<this.users.length;i++)
        {
            if(this.users[i].name === name)
            {
                return this.users[i];
            }
        }

        return null;
    }

    getUserNames()
    {
        const userNames = [];

        for(let i=0;i<this.users.length;i++)
        {
            userNames.push(this.users[i].name);
        }
        return userNames;
    }
}