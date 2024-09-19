import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import DataClient from "../../backend/crypto/DataClient";

export default function Graph() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "BTC price points",
        data: [], // Same data as the line
        pointBackgroundColor: "rgba(100, 100, 100)",  
        pointBorderColor: "rgba(100, 100, 100)",  // Border color for points
        pointRadius: 5,  // Visible points
        showLine: false,  // No connecting line, just points
      },
    ],
  });

  useEffect(() => {
    const parser = new DataClient((data) => {
      const dates = data.map((item) => item.date);
      const prices = data.map((item) => parseFloat(item.price));

      // Generate point colors based on value
      const pointColors = data.map((item) => {
        return getColor(item.alphaSquaredRisk, 0, 1)
      });

      setChartData({
        labels: dates,
        datasets: [
          {
            label: "BTC price points",
            data: prices, // Same data as the line
            pointBackgroundColor: pointColors,  // Dynamically colored points
            pointBorderColor: pointColors,  // Border color for points
            pointRadius: 2,  // Visible points
            showLine: false,  // No connecting line, just points
          }
        ],
      });
    });
  }, []); // Empty dependency array means this runs once on component mount

  const chartOptions = {
    responsive: true,
    animation: false,
    plugins: {
      legend: {
        display: true,
      },
    },
    scales: {
        y: {
          type: 'logaritmhic',
        },
      },
  };

  function getColor(x, min, max) {
    // Ensure x is between min and max
    x = Math.max(min, Math.min(x, max));
    
    // Find the midpoint
    const mid = (min + max) / 2;
    
    let red, green, blue;
    
    if (x <= mid) {
      // Transition from blue (0,0,255) to yellow (255,255,0)
      const ratio = (x - min) / (mid - min);
      red = Math.round(255 * ratio);   // Increase red
      green = Math.round(255 * ratio); // Increase green
      blue = 255;                      // Stay blue
    } else {
      // Transition from yellow (255,255,0) to red (255,0,0)
      const ratio = (x - mid) / (max - mid);
      red = 255;                       // Stay red
      green = Math.round(255 * (1 - ratio)); // Decrease green
      blue = 0;                        // Stay 0 (no blue)
    }
    
    // Return the color as an RGB string
    return `rgb(${red}, ${green}, ${blue})`;
  }
  

  return (
    <Line data={chartData} options={chartOptions} />
  );
}
