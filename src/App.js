import './App.css';
import { Component } from 'react';
import React, {useState} from 'react'

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

class GoalRow extends Component
{
  render()
  {
    return(
      <div>
        <p>{this.props.value}/{this.props.max}</p>
        <p>{Math.floor(this.props.value/this.props.max * 100)} %</p>
      </div>
    )
  }
}

function App() {
  const [input, setInput] = useState([0]);

  function addPoint()
  {
    let addition = Math.floor(Math.random() * 30);
    setInput(input.concat(addition));
  }

  return (
    <div style={{width:'40%', height:'40%'}}>
      <Line data={generateData(input)}/>
      <button onClick={addPoint}>Add data point
      </button>

      <p>Testing adding some new text yeaa</p>

      <GoalRow value={getTotal(input)} max={1400}/>
    </div>
  );
}

export default App;
