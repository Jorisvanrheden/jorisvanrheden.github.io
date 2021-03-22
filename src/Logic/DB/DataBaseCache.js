class UserDate
{
    constructor(date)
    {
        this.date = date;

        this.values = [];
    }

    add(value)
    {
        this.values.push(value);
    }
}

class User
{
    constructor(name)
    {
        this.name = name;

        this.userDates = [];
    }

    add(date, value)
    {
        let dateEntry = this.getDate(date);
        if(dateEntry === null)
        {
            dateEntry = new UserDate(date);
            this.userDates.push(dateEntry);
        }
        dateEntry.add(value);
    }

    getDistancesOnDate(date)
    {
        let dateEntry = this.getDate(date);
        if(dateEntry !== null)
        {
            return dateEntry.values;
        }
        return [];
    }

    getDate(date)
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
    constructor()
    {
        this.users = [];
    }

    add(name, date, value)
    {
        let user = this.getUser(name);
        if(user === null)
        {
            user = new User(name);
            this.users.push(user);
        }
        
        user.add(date, value);
    }

    getUser(name)
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