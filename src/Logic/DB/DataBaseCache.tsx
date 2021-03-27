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
        let names = [];

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
        //let entries = [];

        console.log("Getting entires");
        if(this.database)
        {
            let typeCount = Object.keys(this.database[this.DB_USERS][name][this.DB_DATES][date]).length;
            console.log(typeCount);

            console.log(this.database);
            for(let i=0;i<typeCount;i++)
            {
                let test = Object.keys(this.database[this.DB_USERS][name][this.DB_DATES][date]);
                console.log(test);

                let property = Object.keys(this.database[this.DB_USERS][name][this.DB_DATES][date])[i];

                let value = Object.keys(this.database[this.DB_USERS][name][this.DB_DATES][date][property]);
                console.log(property + " - " + value);
            }
        }       
        return [];
        //return entries;
    }

    processValueQuery(name:string, date:string, type:string)
    {
        return this.database[this.DB_USERS][name][this.DB_DATES][date][type];
    }
}