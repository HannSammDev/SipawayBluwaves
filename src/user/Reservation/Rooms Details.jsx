import React, { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { textDB } from "../../firebase"; // Assuming you have configured Firebase already

export const Rooms_Info = () => {
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [reservations, setReservations] = useState([]); // New state to store reservation data
  const [isGuestsExpanded, setIsGuestsExpanded] = useState(false);

  // Initialize default check-in and check-out dates
  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckInDate(today.toISOString().split("T")[0]);
    setCheckOutDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  // Fetch rooms from Firebase and filter based on availability
  const fetchAvailableRooms = async () => {
    try {
      const roomCollection = collection(textDB, "guestData");
      const querySnapshot = await getDocs(roomCollection);
      const rooms = [];

      querySnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, ...doc.data() });
      });

      // Filter out rooms that are reserved or checked-in during the selected date range
      const filteredRooms = rooms.filter((room) =>
        isRoomAvailable(room, checkInDate, checkOutDate)
      );

      setAvailableRooms(filteredRooms); // Set the rooms that are available
      setReservations(rooms); // Store all reservations for future use if needed
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    }
  };

  // Function to check if a room is available within the given date range
  const isRoomAvailable = (room, checkInDate, checkOutDate) => {
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    const roomCheckIn = new Date(room.checkInDate); // Check-in date for the room (from reservation)
    const roomCheckOut = new Date(room.checkOutDate); // Check-out date for the room (from reservation)

    // Exclude rooms that are already reserved or checked in during the selected date range
    if (
      (checkIn >= roomCheckIn && checkIn < roomCheckOut) || // Selected check-in falls within a reserved or checked-in range
      (checkOut > roomCheckIn && checkOut <= roomCheckOut) || // Selected check-out falls within a reserved or checked-in range
      (checkIn <= roomCheckIn && checkOut >= roomCheckOut) // Selected range encompasses a reservation or check-in period
    ) {
      return false; // Room is unavailable
    }

    return true; // Room is available
  };

  // Function to update the number of guests
  const updateGuests = (type, action) => () => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [type]:
        action === "increase"
          ? prevGuests[type] + 1
          : Math.max(0, prevGuests[type] - 1),
    }));
  };

  // Toggle dropdown
  const toggleExpanded = (setter) => () => {
    setter((prev) => !prev);
  };

  // Handle form submission to trigger room search
  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAvailableRooms();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Find Available Rooms</h2>

      {/* Form for searching rooms */}
      <form onSubmit={handleSubmit}>
        <div
          className="card"
          style={{
            maxWidth: "2000px",
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
            borderRadius: "5px",
            padding: "1em",
          }}
        >
          <div className="card-body">
            <div className="row mb-3">
              {/* Guests Dropdown */}
              <div className="col-lg-4">
                <div className="dropdown">
                  <button
                    className="btn btn-light border border-dark dropdown-toggle"
                    onClick={toggleExpanded(setIsGuestsExpanded)}
                    type="button"
                  >
                    Guests: {guests.adults} Adult
                    {guests.adults !== 1 ? "s" : ""}, {guests.children} Child
                    {guests.children !== 1 ? "ren" : ""}
                  </button>
                  {isGuestsExpanded && (
                    <div className="dropdown-menu p-3 show">
                      <div className="d-flex justify-content-between align-items-center mb-2">
                        {["Adults", "Children"].map((type) => (
                          <div key={type}>
                            <label className="me-2">{type}:</label>
                            <div
                              className="btn-group"
                              style={{ marginRight: "1em" }}
                            >
                              <button
                                className="btn btn-light border border-dark"
                                onClick={updateGuests(type.toLowerCase(), "decrease")}
                              >
                                -
                              </button>
                              <span className="btn btn-light border border-dark disabled">
                                {guests[type.toLowerCase()]}
                              </span>
                              <button
                                className="btn btn-light border border-dark"
                                onClick={updateGuests(type.toLowerCase(), "increase")}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Check-in and Check-out Dates */}
              {[
                { state: checkInDate, setter: setCheckInDate, label: "Check-in" },
                { state: checkOutDate, setter: setCheckOutDate, label: "Check-out" },
              ].map(({ state, setter, label }) => (
                <div key={label} className="col-lg-4 mb-3">
                  <label className="form-label">{label} Date:</label>
                  <input
                    type="date"
                    className="form-control"
                    value={state}
                    onChange={(e) => setter(e.target.value)} // Auto-update date and fetch rooms
                  />
                </div>
              ))}

              {/* Search Button */}
              <div className="col-lg-12 text-end">
                <button type="submit" className="btn btn-primary px-4">
                  Search Rooms
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>

      {/* Available Rooms */}
      <div className="mt-4">
        <h3 className="text-center">Available Rooms</h3>
        {availableRooms.length > 0 ? (
          <div className="row">
            {availableRooms.map((room) => (
              <div key={room.id} className="col-lg-4 mb-3">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{room.roomname}</h5>
                    <p className="card-text">{room.description}</p>
                    <p className="card-text">
                      Price: ${room.roomPrice} / night
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center">No rooms available for the selected dates.</p>
        )}
      </div>
    </div>
  );
};
