import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  // Define colors
  const CHART_COLORS = {
    red: "rgb(255, 75, 75)",      // Vibrant Red
    orange: "rgb(255, 159, 64)", // Warm Orange
    yellow: "rgb(255, 205, 86)", // Bright Yellow
    green: "rgb(75, 192, 192)",  // Cool Green
    blue: "rgb(54, 162, 235)",   // Vibrant Blue
  };
  

  // Generate random numbers
  const generateNumbers = (count, min, max) =>
    Array.from({ length: count }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );

  // Chart data
  const data = {
    // labels: ["Red", "Orange", "Yellow", "Green", "Blue"],
    datasets: [
      {
        label: "Dataset 1",
        data: generateNumbers(5, 0, 100),
        backgroundColor: Object.values(CHART_COLORS),
      },
    ],
  };

  // Chart options
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        // text: "Chart.js Doughnut Chart",
      },
    },
  };

  return (
    <div>
      {/* <h2>Doughnut Chart</h2> */}
      <Doughnut  data={data} options={options} />
    </div>
  );
};
