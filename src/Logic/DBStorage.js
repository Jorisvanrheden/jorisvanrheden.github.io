import UserEntryDB from './UserEntryDB'

export default class DBStorage
{
    constructor()
    {

    }

    create(date, name)
    {
        return new UserEntryDB(date, name);
    }
}