import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";

// Register the Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const Test = () => {
    // Data for the chart
    const labels = ["January", "February", "March", "April", "May", "June", "July"]; // Example months
    const data = {
        labels: labels,
        datasets: [
            {
                label: "My First Dataset",
                data: [65, 59, 80, 81, 56, 55, 40], // Example data
                backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(255, 159, 64, 0.2)",
                    "rgba(255, 205, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(201, 203, 207, 0.2)",
                ],
                borderColor: [
                    "rgb(255, 99, 132)",
                    "rgb(255, 159, 64)",
                    "rgb(255, 205, 86)",
                    "rgb(75, 192, 192)",
                    "rgb(54, 162, 235)",
                    "rgb(153, 102, 255)",
                    "rgb(201, 203, 207)",
                ],
                borderWidth: 1,
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
                text: "Chart.js Bar Chart Example",
            },
        },
        scales: {
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Bar Chart Example</h2>
            {/* Render the Bar Chart */}
            <Bar data={data} options={options} />
        </div>
    );
};

// const handleDecline = async (pending, reservation) => {
//     if (!pending || !reservation) {
//         console.error('No pending or reservation selected.');
//         return;
//     }

//     try {
//         console.log('Deleting reservation with id:', reservation.id); // Log reservation id
//         console.log('Deleting pending with id:', pending.id); // Log pending id

//         await deleteDoc(doc(textDB, 'reservations', reservation.id));
//         await deleteDoc(doc(textDB, 'Pending', pending.id));
//         setPendings((prevPendings) =>
//             prevPendings.filter((item) => item.id !== pending.id && item.id !== reservation.id)
//         );
//     } catch (error) {
//         console.error('Error deleting document:', error);
//     }
// };

// const handleShowDeclineModal = (pending, reservation) => {
//     console.log('handleShowDeclineModal called with pending:', pending); // Log pending
//     console.log('handleShowDeclineModal called with reservation:', reservation); // Log reservation

//     setSelectedReservation(reservation);
//     setSelectedPending(pending);
//     setShowDeclineModal(true);
// };

// <Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)}>
//     <Modal.Body>Are you sure you want to decline this action?</Modal.Body>
//     <Modal.Footer>
//         <Button variant="secondary" onClick={() => setShowDeclineModal(false)}>
//             Cancel
//         </Button>
//         <Button
//             variant="danger"
//             onClick={() => {
//                 if (selectedPending && selectedReservation) {
//                     console.log('Declining reservation and pending:', selectedPending, selectedReservation); // Log selected values
//                     handleDecline(selectedPending, selectedReservation);
//                 } else {
//                     console.error('selectedPending or selectedReservation is undefined');
//                 }
//                 setShowDeclineModal(false);
//             }}
//         >
//             Decline
//         </Button>
//     </Modal.Footer>
// </Modal>


