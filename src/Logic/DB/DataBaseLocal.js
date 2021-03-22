import DataBaseCache from "./DataBaseCache";

export default class DataBaseLocal
{
    constructor()
    {
        //Store a local cached version of the database, since there is no way to directly access data
        //The only way is to asynchronously call the database, where callbacks trigger the update

        this.databaseCache = null;
    }

    init(callback)
    {
        this.callback = callback;
    }

    add(name, date, value)
    {

    }

    remove(name, date, index)
    {

    }

    edit(name, date, index, value)
    {

    }

    getUserNames()
    {
        return [];
    }

    update()
    {
        
    }
}