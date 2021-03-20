import { useScrollTrigger } from '@material-ui/core';
import UserData from './UserData.js'

//linking data storage
//local
//import LocalStorage from './LocalStorage.js'
//database
import DBStorage from './DBStorage.js'

export default class UserCollection
{
    constructor()
    {
        const storage = new DBStorage();

        this.users = 
        [
            new UserData("Joris", storage),
            new UserData("Minyu", storage),
            new UserData("New User", storage)
        ];
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