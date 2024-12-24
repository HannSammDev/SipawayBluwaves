import React from "react";
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";


ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = () => {
  // Define colors
  const CHART_COLORS = {
    red: "rgb(255, 75, 75)",     
    orange: "rgb(255, 159, 64)",
    yellow: "rgb(255, 205, 86)", 
    green: "rgb(75, 192, 192)",  
    blue: "rgb(54, 162, 235)",   
  };
  

  // Generate random numbers
  const generateNumbers = (count, min, max) =>
    Array.from({ length: count }, () =>
      Math.floor(Math.random() * (max - min + 1)) + min
    );

 
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
      <h2></h2>
      <Doughnut  data={data} options={options} />
    </div>
  );
};
