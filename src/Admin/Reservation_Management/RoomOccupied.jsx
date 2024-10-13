import React, { useState, useEffect } from "react";
import { textDB } from "../../firebase"; // Ensure this is correctly imported
import { collection, query, where, getDocs } from "firebase/firestore";
import { format } from "date-fns";
import { Outlet } from "react-router-dom";
import OccupiedCottages from "./CottagesOccu";

const OccupiedRooms = () => {
  const [occupiedRooms, setOccupiedRooms] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchOccupiedRooms = async () => {
      const formattedDate = format(selectedDate, "yyyy-MM-dd");
      const q = query(collection(textDB, "rooms"));

      const querySnapshot = await getDocs(q);
      const rooms = [];

      querySnapshot.forEach((doc) => {
        const roomData = doc.data();
        const reservations = roomData.reservations || [];
        const isOccupied = reservations.some(
          (res) =>
            format(res.date.toDate(), "yyyy-MM-dd") === formattedDate &&
            res.status === "occupied"
        );

        if (isOccupied) {
          rooms.push({ id: doc.id, ...roomData });
        }
      });

      setOccupiedRooms(rooms);
    };

    fetchOccupiedRooms();
  }, [selectedDate]);

  return (
    <>
      <div className="container">
        <h2 className="mt-5 mb-3">
          Occupied Rooms on {format(selectedDate, "MMMM d, yyyy")}
        </h2>
        <div className="mb-3">
          <label htmlFor="date" className="form-label">
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            className="form-control"
            value={format(selectedDate, "yyyy-MM-dd")}
            onChange={(e) => setSelectedDate(new Date(e.target.value))}
          />
        </div>
        {occupiedRooms.length > 0 ? (
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
              {occupiedRooms.map((room) => (
                <tr key={room.id}>
                  <td>{room.id}</td>
                  <td>{room.description}</td>
                  <td>{room.price}</td>
                  <td>{room.amenities}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No rooms are occupied on this date.</p>
        )}
      </div>
        <Outlet/>
        <OccupiedCottages/>
    </>
  );
};

export default OccupiedRooms;
