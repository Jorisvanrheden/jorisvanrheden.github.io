
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
    constructor(date, name, callback)
    {
        this.date = date;
        this.name = name;
        this.callback = callback;
        this.exerciseEntries = [];
    }

    addExerciseEntry(distance, photo)
    {
        this.exerciseEntries.push(new ExerciseEntry(distance, photo));

        this.callback();
    }

    setDistance(index, distance)
    {
        if(index < this.exerciseEntries.length)
        {
            this.exerciseEntries[index].distance = distance;
        }

        this.callback();
    }

    removeEntry(index)
    {
        if(index < this.exerciseEntries.length)
        {
            this.exerciseEntries.splice(index, 1);         
        }

        this.callback();
    }

    update()
    {
        this.callback();
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