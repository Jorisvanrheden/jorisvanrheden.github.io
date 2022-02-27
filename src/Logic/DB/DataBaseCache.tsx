export default class DataBaseCache
{
    database:any;

    readonly DB_USERS:string = "users";
    readonly DB_DATES:string = "dates";

    constructor(database:any)
    {
        this.database = database;
    }

    getUserNames()
    {
        let names : any[] = [];

        if(this.database)
        {
            let userCount = Object.keys(this.database[this.DB_USERS]).length;

            for(let i=0;i<userCount;i++)
            {
                let userName = Object.keys(this.database[this.DB_USERS])[i];
                names.push(userName);
            }
        }   
        

        return names;
    }

    getEntries(name:string, date:string)
    {
        let entries :any[] = [];

        if(this.isValidEntry(name, date))
        {
            let localContext = this.database[this.DB_USERS][name][this.DB_DATES][date];
            let localObject = Object.keys(localContext);

            for(let i=0;i<localObject.length;i++)
            {
                let property = localObject[i];
                let value = localContext[property];

                entries.push({p: property, v:value});
            }
        }       
        
        return entries;
    }

    getAllValues()
    {
        let values :any[] = [];

        let usersObject = Object.keys(this.database[this.DB_USERS]);
        let userCount = usersObject.length;

        console.log("Users: ", userCount);

        for(let i=0;i<userCount;i++)
        {
            let name = usersObject[i];

            console.log("Name: ", name);

            if(!this.database[this.DB_USERS][name]) continue;

            console.log("Name OK");

            if(!this.database[this.DB_USERS][name][this.DB_DATES]) continue;

            let datesObject = Object.keys(this.database[this.DB_USERS][name][this.DB_DATES]);
            let dateCount = datesObject.length;

            for(let j=0;j<dateCount;j++)
            {
                let date = datesObject[j];

                if(!this.database[this.DB_USERS][name][this.DB_DATES][date]) continue;

                let typeObject = Object.keys(this.database[this.DB_USERS][name][this.DB_DATES][date]);
                let typeCount = typeObject.length;

                for(let k=0;k<typeCount;k++)
                {
                    let type = typeObject[k];

                    console.log(type);

                }
            }
        }

        values.push({k:0, v:0});

        return values;
    }

    isValidEntry(name:string, date:string)
    {
        if(!this.database) return false;
        if(!this.database[this.DB_USERS][name]) return false;
        if(!this.database[this.DB_USERS][name][this.DB_DATES]) return false;
        if(!this.database[this.DB_USERS][name][this.DB_DATES][date]) return false;

        return true;
    }
}