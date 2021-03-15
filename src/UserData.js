export default class UserData
{
    constructor(name)
    {
        this.name = name;

        //initialize new array for data
        this.data = [];
    }

    setData(date, distance, photo)
    {
        this.data.push({date: date, distance: distance, photo: photo});
    }
}