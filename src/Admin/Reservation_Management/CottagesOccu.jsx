import React, { useState, useEffect } from "react";
import { textDB } from "../../firebase"; // Ensure this is correctly imported
import { collection, query, where, getDocs } from "firebase/firestore";
import { format } from 'date-fns';

const OccupiedCottages = () => {
  const [occupiedCottages, setOccupiedCottages] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    const fetchOccupiedCottages = async () => {
      const formattedDate = format(selectedDate, 'yyyy-MM-dd');
      const q = query(collection(textDB, "cottages")); // Updated to use "cottages"

      const querySnapshot = await getDocs(q);
      const cottages = [];

      querySnapshot.forEach((doc) => {
        const cottageData = doc.data();
        const reservations = cottageData.reservations || [];
        const isOccupied = reservations.some(
          (res) => format(res.date.toDate(), 'yyyy-MM-dd') === formattedDate && res.status === 'occupied'
        );

        if (isOccupied) {
          cottages.push({ id: doc.id, ...cottageData });
        }
      });

      setOccupiedCottages(cottages);
    };

    fetchOccupiedCottages();
  }, [selectedDate]);

  return (
    <div className="container">
      <h2 className="mt-5 mb-3">Occupied Cottages on {format(selectedDate, 'MMMM d, yyyy')}</h2>
      <div className="mb-3">
        <label htmlFor="date" className="form-label">Select Date:</label>
        <input
          type="date"
          id="date"
          className="form-control"
          value={format(selectedDate, 'yyyy-MM-dd')}
          onChange={(e) => setSelectedDate(new Date(e.target.value))}
        />
      </div>
      {occupiedCottages.length > 0 ? (
        <table className="table table-bordered">
          <thead>
            <tr>
              <th scope="col">Cottage ID</th>
              <th scope="col">Description</th>
              <th scope="col">Price</th>
              <th scope="col">Amenities</th>
            </tr>
          </thead>
          <tbody>
            {occupiedCottages.map((cottage) => (
              <tr key={cottage.id}>
                <td>{cottage.id}</td>
                <td>{cottage.description}</td>
                <td>{cottage.price}</td>
                <td>{cottage.amenities}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No cottages are occupied on this date.</p>
      )}
    </div>
  );
};

export default OccupiedCottages;
