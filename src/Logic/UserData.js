export default class UserData
{
    constructor(name, storage)
    {
        this.name = name;
        this.storage = storage;

        //initialize new array of ExerciseEntry structs
        this.dateEntries = [];
    }

    getDistancesOnDate(date)
    {
        let dateEntry = this.getDateEntry(date);
        if(dateEntry!==null)
        {
            return dateEntry.getDistances();
        }
        
        return [];
    }

    addEntry(date)
    {
        let dateEntry = this.getDateEntry(date);

        //Create a new unique date entry if it doesnt exist yet
        if(dateEntry === null)
        {     
            dateEntry = this.storage.create(date, this.name);
            this.dateEntries.push(dateEntry);
        }

        dateEntry.addExerciseEntry(0, "");
    }

    removeEntry(date, index)
    {
        let dateEntry = this.getDateEntry(date);

        //Create a new unique date entry if it doesnt exist yet
        if(dateEntry !== null)
        {
            dateEntry.removeEntry(index);
        }
    }

    setDistance(date, index, distance)
    {
        let dateEntry = this.getDateEntry(date);
        if(dateEntry!==null)
        {
            return dateEntry.setDistance(index, distance);
        }
    }

    getDateEntry(date)
    {
        for(let i=0;i<this.dateEntries.length;i++)
        {
            if(this.dateEntries[i].date === date) return this.dateEntries[i];
        }
        return null;
    }
}