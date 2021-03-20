
class ExerciseEntry
{
    constructor(distance, photo)
    {
        this.distance = distance;
        this.photo = photo;
    }
}

export default class UserEntryLocal
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

    removeEntry(index)
    {
        if(index < this.exerciseEntries.length)
        {
            this.exerciseEntries.splice(index, 1);         
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