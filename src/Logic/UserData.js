class ExerciseEntry
{
    constructor(distance, photo)
    {
        this.distance = distance;
        this.photo = photo;
    }
}

class DateEntry
{
    constructor(date)
    {
        this.date = date;
        this.exerciseEntries = [];
    }

    addExerciseEntry(distance, photo)
    {
        this.exerciseEntries.push(new ExerciseEntry(distance, photo));
    }

    setDistance(index, distance)
    {
        if(index < this.exerciseEntries.length)
        {
            this.exerciseEntries[index].distance = distance;
        }
    }

    getDistances()
    {
        let arr = [];
        for(let i=0;i<this.exerciseEntries.length;i++)
        {
            arr.push(this.exerciseEntries[i].distance);
        }
        return arr;
    }
}

export default class UserData
{
    constructor(name)
    {
        this.name = name;

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
            dateEntry = new DateEntry(date);
            this.dateEntries.push(dateEntry);
        }

        dateEntry.addExerciseEntry(0, "");
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