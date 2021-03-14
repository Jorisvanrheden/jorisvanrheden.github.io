import { Component } from 'react';
import {Line} from 'react-chartjs-2';


function getLabels(input)
{
  let arr = [];
  for(let i=0;i<input.length;i++)
  {
    arr[i] = i;
  }
  return arr;
}

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

function getTotal(input)
{
  let cumulative = getCumulative(input);
  return cumulative[cumulative.length-1];
}

function generateData(input)
{
  return { 
    labels: getLabels(input),
    datasets: [
      {
        label: "Total distance (km)",
        data: getCumulative(input),
        fill: true,
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
              data={generateData(this.props.data)}
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