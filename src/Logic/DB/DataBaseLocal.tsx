import DataBaseCache from "./DataBaseCache";

export default class DataBaseLocal
{
    databaseCache:DataBaseCache = new DataBaseCache();
    callback:any = null;

    constructor()
    {

    }

    init(callback:any)
    {
        this.callback = callback;
    }

    add(name:string, date:string, value:number)
    {

    }

    remove(name:string, date:string, index:number)
    {

    }

    edit(name:string, date:string, index:number, value:number)
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