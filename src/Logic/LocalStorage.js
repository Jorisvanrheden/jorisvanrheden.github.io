import UserEntryLocal from './UserEntryLocal'

export default class LocalStorage
{
    constructor(callback)
    {
        this.callback = callback;
    }

    create(date, name)
    {
        return new UserEntryLocal(date, name, this.callback);
    }

    loadEntries()
    {
    }
}