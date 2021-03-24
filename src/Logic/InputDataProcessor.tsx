interface DataEntry
{
    value:number;
    date:string;
}

export default class InputDataProcessor
{
    entries:Array<DataEntry> = [];

    constructor()
    {

    }

    addDataEntry(value:number, date:string)
    {
        this.entries.push({value: value, date:date });
    }

    getEarliestDate()
    {
        let earliest:string = "";
        let earliest_int = Number(new Date());

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
        let earliest:string = "";
        let earliest_int = Number(new Date());

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

    getAdditionOnDate(date:string)
    {
        let total = 0;

        for(let i=0;i<this.entries.length;i++)
        {       
            if(this.entries[i].date === date) total += this.entries[i].value;
        }
        return total;
    }

    getDateLabel(date:string)
    {       
        return date; 

        //this can be used to customize labels based on the input
    }

    getDaysUntil(date1:Date, date2:Date)
    {
        let diff = date2.getTime() - date1.getTime();
        let days = Math.ceil(diff/(1000*3600*24));
        return days;
    }
}



