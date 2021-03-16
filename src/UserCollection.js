import { useScrollTrigger } from '@material-ui/core';
import UserData from './UserData.js'

export default class UserCollection
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

    getDataEntry(userName)
    {
        let user = this.getUser(userName);
        if(user === null) return [];

        return user.data;
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