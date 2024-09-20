import React, { useState } from "react";
import Graph from "../frontend/crypto/Graph";
import Layout from "./layouts/Layout";

export default function Project_Crypto() {
  const [highlightedRange, setHighlightedRange] = useState({ min: 0, max: 1 });

  // Predefined ranges
  const ranges = [
    { min: 0, max: 0.2 },
    { min: 0.2, max: 0.4 },
    { min: 0.4, max: 0.6 },
    { min: 0.6, max: 0.8 },
    { min: 0.8, max: 1.0 },
  ];

  // Handle range button click
  const handleRangeClick = (range) => {
    setHighlightedRange(range);
  };

  return (
    <Layout>
      <div>
        <div>
          {ranges.map((range, index) => (
            <button key={index} onClick={() => handleRangeClick(range)}>
              [{range.min}, {range.max}]
            </button>
          ))}
        </div>
      </div>

      {/* Pass highlightedRange to the Graph component */}
      <Graph highlightedRange={highlightedRange} />
    </Layout>
  );
}
