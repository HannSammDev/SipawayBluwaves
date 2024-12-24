import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import { collection, getDocs } from 'firebase/firestore';
import { textDB } from '../../firebase'; // Ensure this path is correct
import { Dashtwo } from './dash2';
import ReservationCalendar from './components/calendar';
import { DoughnutChart } from './components/Doughnut';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  annotationPlugin,
);

const fetchReservations = async () => {
  const reservationsCollection = collection(textDB, 'Pending');
  const reservationsSnapshot = await getDocs(reservationsCollection);
  return reservationsSnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }));
};

const calculateDailyIncome = (reservations) => {
  const incomeByDay = {};

  reservations.forEach((reservation) => {
    const date = reservation.checkInDate; // Assuming checkInDate is in 'YYYY-MM-DD' format
    const roomPrice = parseFloat(reservation.roomPrice) || 0;
    const cottagePrice = parseFloat(reservation.cottagePrice) || 0;
    const totalRoomInitialIncome = roomPrice * 0.5; // 50% initial payment for room
    const totalRoomDueUponArrival = roomPrice * 0.5; // 50% due upon arrival for room
    const totalCottageInitialIncome = cottagePrice * 0.5; // 50% initial payment for cottage
    const totalCottageDueUponArrival = cottagePrice * 0.5; // 50% due upon arrival for cottage

    const totalIncome = roomPrice + cottagePrice;
    const initialIncome = totalRoomInitialIncome + totalCottageInitialIncome;
    const dueUponArrival = totalRoomDueUponArrival + totalCottageDueUponArrival;

    if (incomeByDay[date]) {
      incomeByDay[date].totalIncome += totalIncome;
      incomeByDay[date].initialIncome += initialIncome;
      incomeByDay[date].dueUponArrival += dueUponArrival;
    } else {
      incomeByDay[date] = {
        totalIncome: totalIncome,
        initialIncome: initialIncome,
        dueUponArrival: dueUponArrival,
      };
    }
  });

  const sortedDates = Object.keys(incomeByDay).sort();
  return sortedDates.map((date) => ({
    day: date,
    ...incomeByDay[date],
  }));
};

export const Dashboard = () => {
  const [dailyIncomeData, setDailyIncomeData] = useState([]);

  useEffect(() => {
    fetchReservations().then((reservations) => {
      const incomeData = calculateDailyIncome(reservations);
      setDailyIncomeData(incomeData);
    });
  }, []);

  const data = {
    labels: dailyIncomeData.map((item) => item.day),
    datasets: [
      {
        label: 'Daily Income',

        data: dailyIncomeData.map((item) => item.totalIncome),
        borderColor: '#4e73df',
        backgroundColor: '#4e73df',
        pointStyle: 'circle',
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
        borderWidth: 2,
      },
      {
        label: 'Total Earnings  ',
        data: dailyIncomeData.map((item, index) =>
          dailyIncomeData
            .slice(0, index + 1)
            .reduce((sum, data) => sum + data.totalIncome, 0),
        ),
        borderColor: '#36b9cc',
        backgroundColor: '#36b9cc',
        pointStyle: 'rect',
        pointRadius: 6,
        pointHoverRadius: 8,
        fill: false,
        borderWidth: 2,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
        labels: {
          color: '#1e1e2f',
          font: {
            size: 14,
          },
        },
      },
      title: {
        display: true,
        text: 'Income Overview',
        color: '#1e1e2f',
        font: {
          size: 20,
          weight: 'bold',
        },
        padding: {
          top: 10,
          bottom: 30,
        },
      },
      tooltip: {
        backgroundColor: '#f8f9fc',
        titleColor: '#6c757d',
        bodyColor: '#1e1e2f',
        borderColor: '#6c757d',
        borderWidth: 1,
        callbacks: {
          label: function (context) {
            return `₱${context.raw}`;
          },
        },
      },
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'Day 3',
      //       borderColor: 'red',
      //       borderWidth: 2,
      //       label: {
      //         enabled: true,
      //         content: 'Special Day',
      //       },
      //     },
      //   ],
      // },
    },
    scales: {
      y: {
        ticks: {
          color: '#6c757d',
          callback: function (value) {
            return `₱${value}`;
          },
        },
        grid: {
          color: '#e3e6f0',
        },
      },
      x: {
        ticks: {
          color: '#6c757d',
        },
        grid: {
          display: false,
        },
      },
    },
  };

  const today = new Date().toISOString().split('T')[0];
  const todayData = dailyIncomeData.find((item) => item.day === today) || {};
  const todayInitialIncome = todayData.initialIncome || 0;
  // const todayDueUponArrival = todayData.dueUponArrival || 0;
  const totalIncome = dailyIncomeData.reduce(
    (sum, item) => sum + item.totalIncome,
    0,
  );

  return (
    <>
      <Dashtwo />

      <div className="container mt-5">
        <div className="row">
          {/* Chart Section */}
          <div className="col-lg-8 col-md-12 mb-4">
            <div
              className="chart-container p-4"
              style={{
                width: '100%',
                borderRadius: '15px',
                boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.2)',
              }}
            >
              <Line data={data} options={options} />
            </div>
          </div>


          <div className="col-lg-4 col-md-12">
           
            <div
              className="text-center mb-4 p-3"
              style={{
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              }}
            >
              <DoughnutChart />
            </div>

            
            {/* <div
              className="card text-center mb-4 p-3"
              style={{
                boxShadow: '0px 10px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '12px',
              }}
            >
              <div className="card-body">
                <h5 className="card-title fs-4 text-dark">Total Income</h5>
                <p className="card-text display-4 text-dark">₱{totalIncome}</p>
              </div>
            </div> */}
          </div>
        </div>

      
        <div className="row mt-4">
          <div className="col-12">
            <div
              className="p-4"
              
            >
              <ReservationCalendar />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
