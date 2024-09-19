export default class DataClient {
	constructor(
        onDataLoaded,
    ) {
        fetch("./../crypto/test_output.txt")
        .then(response => response.text())
        .then(text => {
            // Split the text into an array of lines
            const lines = text.split('\n');
            const parsedData = lines.slice(1).map(line => {
                const parts = line.split(',');
                return {
                    date: parts[0],
                    price: parts[1],
                    fgi: parts[2],
                    btcRisk: parts[3],
                    alphaSquaredRisk: parts[4],
                };
            });

            if(onDataLoaded) onDataLoaded(parsedData);
        })
        .catch(error => {
            console.error('Error fetching or parsing file:', error);
        });

        // this.loadFGIData();
    }

    private loadFGIData() {
        fetch('/fng/?limit=0')
            .then(response => response.json())
            .then(data => {
                // Assuming data is an array of FGI objects
                const values = data.data.map(item => parseFloat(item.value)); // Extract values and convert to float
    
                // Normalize values
                const parsedData = data.data.map(item => {
                    const timestamp = parseInt(item.timestamp, 10); // Convert timestamp to a number
                    const date = new Date(timestamp * 1000); // Convert Unix timestamp to milliseconds
                    const formattedDate = date.toLocaleDateString(); // Format date
                    const value = parseFloat(item.value); // Convert value to float
                        
                    return {
                        value: value, 
                        normalizedValue: value / 100,
                        date: this.convertDateFormat(formattedDate),
                    };
                });
    
                console.log(parsedData); // Print the parsed and normalized data
            })
            .catch(error => console.error('Error:', error));
    }

    private convertDateFormat(dateString) {
        // Split the input date string into components
        const [day, month, year] = dateString.split('/');
        
        // Construct the new date string in YYYY-MM-DD format
        const formattedDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
        
        return formattedDate;
    }
}
