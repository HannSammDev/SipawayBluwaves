import React, { useState, useEffect } from "react";
import { textDB } from "../../firebase"; // Ensure this is correctly imported
import { collection, query, getDocs } from "firebase/firestore";
import { format, isBefore, isAfter } from 'date-fns';

const AvailableRooms = ({ checkInDate, checkOutDate }) => {
  const [availableRooms, setAvailableRooms] = useState([]);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      const checkIn = new Date(checkInDate);
      const checkOut = new Date(checkOutDate);

      if (isNaN(checkIn) || isNaN(checkOut)) {
        console.error("Invalid check-in or check-out date");
        return;
      }

      const q = query(collection(textDB, "rooms"));

      const querySnapshot = await getDocs(q);
      const rooms = [];

      querySnapshot.forEach((doc) => {
        const roomData = doc.data();
        const reservations = roomData.reservations || [];
        const isOccupied = reservations.some((res) => {
          const resDate = res.date.toDate();
          return (
            isBefore(resDate, checkOut) &&
            isAfter(resDate, checkIn) &&
            res.status === 'occupied'
          );
        });

        if (!isOccupied) {
          rooms.push({ id: doc.id, ...roomData });
        }
      });

      setAvailableRooms(rooms);
    };

    fetchAvailableRooms();
  }, [checkInDate, checkOutDate]);

  return (
    <div className="container mt-5">
      <h2 className="mb-3">
        Available Rooms from {checkInDate && !isNaN(new Date(checkInDate)) ? format(new Date(checkInDate), 'MMMM d, yyyy') : 'Invalid Date'} to {checkOutDate && !isNaN(new Date(checkOutDate)) ? format(new Date(checkOutDate), 'MMMM d, yyyy') : 'Invalid Date'}
      </h2>
      {availableRooms.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Room ID</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Amenities</th>
            </tr>
          </thead>
          <tbody>
            {availableRooms.map((room) => (
              <tr key={room.id}>
                <td>{room.roomname}</td>
                <td>{room.description}</td>
                <td>{room.price}</td>
                <td>{room.amenities.join(', ')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No rooms are available for the selected dates.</p>
      )}
    </div>
  );
};

export default AvailableRooms;
 