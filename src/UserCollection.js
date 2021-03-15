import UserData from './UserData.js'

export default class UserCollection
{
    constructor()
    {
        this.users = 
        [
            new UserData("Joris"),
            new UserData("Minyu")
        ];
    }

    addDataEntry(userName, date, distance, photo)
    {
        for(let i=0;i<this.users.length;i++)
        {
            if(this.users[i].name === userName)
            {
                this.users[i].setData(date, distance, photo);
                return;
            }
        }
    }

    getDataEntry(userName)
    {
        for(let i=0;i<this.users.length;i++)
        {
            if(this.users[i].name === userName)
            {
                return this.users[i].data;
            }
        }

        return [];
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