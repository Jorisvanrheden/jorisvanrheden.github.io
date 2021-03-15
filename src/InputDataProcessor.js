export default class InputDataProcessor
{
    constructor()
    {
        this.entries = [];
        this.it = 0;
    }

    addDataEntry(value, date)
    {
        this.entries.push(new DataEntry(value,date));
    }

    getEarliestDate()
    {
        let earliest = new Date();
        let earliest_int = Number(earliest);

        for(let i=0;i<this.entries.length;i++)
        {
            let date_int = Number(new Date(this.entries[i].date));
            if(date_int < earliest_int) 
            {
                earliest_int = date_int;
                earliest = this.entries[i].date;
            }
        }

        return new Date(earliest);
    }

    getLatestDate()
    {
        let earliest = new Date();
        let earliest_int = Number(earliest);

        for(let i=0;i<this.entries.length;i++)
        {
            let date_int = Number(new Date(this.entries[i].date));
            if(date_int > earliest_int) 
            {
                earliest_int = date_int;
                earliest = this.entries[i].date;
            }
        }
        
        return new Date(earliest);
    }

    getDates()
    {
        let arr = [];

        let earliestDate = this.getEarliestDate();
        let latestDate = this.getLatestDate();

        let daysDifference = this.getDaysUntil(earliestDate, latestDate) + 3;

        for(let i=0;i<daysDifference;i++)
        {
            let newDate = new Date(earliestDate);
            newDate.setDate(newDate.getDate() + i - 1);

            let dateString = newDate.toISOString().substring(0, 10);

            arr.push(dateString);
        }

        return arr;
    }

    getAdditionOnDate(date)
    {
        let total = 0;

        for(let i=0;i<this.entries.length;i++)
        {       
            if(this.entries[i].date === date) total += this.entries[i].value;
        }
        return total;
    }

    getDateLabel(date)
    {       
        return date; 

        //this can be used to customize labels based on the input
    }

    getDaysUntil(date1, date2)
    {
        let diff = date2.getTime() - date1.getTime();
        let days = Math.ceil(diff/(1000*3600*24));
        return days;
    }
}

class DataEntry
{
    constructor(value, date)
    {
        this.value = value;
        this.date = date;
    }
}

