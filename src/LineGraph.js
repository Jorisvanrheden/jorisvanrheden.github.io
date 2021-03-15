import { Component } from 'react';
import {Line} from 'react-chartjs-2';

function getCumulative(input)
{
  let arr = [];
  let cumulative = 0;
  for(let i=0;i<input.length;i++)
  {
    cumulative += input[i];
    arr[i] = cumulative;
  }
  return arr;
}

function generateData(input, dates)
{
  return { 
    labels: dates,
    datasets: [
      {
        label: "Total distance (km)",
        data: getCumulative(input),
        fill: true,
        lineTension: 0,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)"
      }
    ]
  }
}

class LineGraphChart extends Component
{
    render()
    {
        return(
            <Line 
              data={generateData(this.props.data, this.props.dates)}
              options =   
              {
                {
                  maintainAspectRatio:false
                }
              }
            />
        )
    }
}

export default LineGraphChart;