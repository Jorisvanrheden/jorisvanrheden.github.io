import UserEntryLocal from './UserEntryLocal'

export default class LocalStorage
{
    create(date, name)
    {
        return new UserEntryLocal(date);
    }
}