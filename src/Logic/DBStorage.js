import UserEntryDB from './UserEntryDB'

export default class DBStorage
{
    constructor(callback)
    {
        this.callback = callback;
    }

    create(date, name)
    {
        return new UserEntryDB(date, name, this.callback);
    }
}