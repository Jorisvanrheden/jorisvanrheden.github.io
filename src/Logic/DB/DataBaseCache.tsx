class UserDate
{
    values:Array<number> = [];
    date:string;

    constructor(date:string)
    {
        this.date = date;
    }

    add(value:number)
    {
        this.values.push(value);
    }
}

class User
{
    name:string;
    userDates:Array<UserDate> = [];
    constructor(name:string)
    {
        this.name = name;
    }

    add(date:string, value:number)
    {
        let dateEntry = this.getDate(date);
        if(dateEntry === null)
        {
            dateEntry = new UserDate(date);
            this.userDates.push(dateEntry);
        }
        dateEntry.add(value);
    }

    getDistancesOnDate(date:string)
    {
        let dateEntry = this.getDate(date);
        if(dateEntry !== null)
        {
            return dateEntry.values;
        }
        return [];
    }

    getDate(date:string)
    {
        for(let i=0;i<this.userDates.length;i++)
        {
            if(this.userDates[i].date === date) return this.userDates[i];
        }
        return null;
    }
}

export default class DataBaseCache
{
    users:Array<User> = [];

    add(name:string, date:string, value:number)
    {
        let user = this.getUser(name);
        if(user === null)
        {
            user = new User(name);
            this.users.push(user);
        }
        
        user.add(date, value);
    }

    getUser(name:string)
    {
        for(let i=0;i<this.users.length;i++)
        {
            if(this.users[i].name === name) return this.users[i];
        }
        return null;
    }

    getUserNames()
    {
        let names = [];
        for(let i=0;i<this.users.length;i++)
        {
            names.push(this.users[i].name);
        }
        return names;
    }
}