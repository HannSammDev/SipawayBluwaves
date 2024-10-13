import React, { useState, useEffect } from "react";
import { Select_Rooms } from "./SelectRooms";
import { collection, getDocs } from "firebase/firestore";
import { textDB } from "../../firebase";

export const Rooms_Info = () => {
  const [guests, setGuests] = useState({ adults: 1, children: 0 });
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isGuestsExpanded, setIsGuestsExpanded] = useState(false);
  const [isCalendarExpanded, setIsCalendarExpanded] = useState(false);

  useEffect(() => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    setCheckInDate(today.toISOString().split("T")[0]);
    setCheckOutDate(tomorrow.toISOString().split("T")[0]);
  }, []);

  useEffect(() => {
    fetchAvailableRooms();
  }, [checkInDate, checkOutDate]);

  const fetchAvailableRooms = async () => {
    try {
      const roomCollection = collection(textDB, "reservations");
      const querySnapshot = await getDocs(roomCollection);
      const rooms = [];

      querySnapshot.forEach((doc) => {
        rooms.push({ id: doc.id, ...doc.data() });
      });

      const filteredRooms = rooms.filter((room) =>
        isRoomAvailable(room, checkInDate, checkOutDate)
      );
      setAvailableRooms(filteredRooms);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    }
  };

  const isRoomAvailable = (room, checkInDate, checkOutDate) => {
    const reservedDates = room.reservedDates || [];
    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);

    for (let reserved of reservedDates) {
      const reservedStart = new Date(reserved.start);
      const reservedEnd = new Date(reserved.end);

      if (
        (checkIn >= reservedStart && checkIn < reservedEnd) ||
        (checkOut > reservedStart && checkOut <= reservedEnd) ||
        (checkIn <= reservedStart && checkOut >= reservedEnd)
      ) {
        return false;
      }
    }

    return true;
  };

  const updateGuests = (type, action) => () => {
    setGuests((prevGuests) => ({
      ...prevGuests,
      [type]:
        action === "increase"
          ? prevGuests[type] + 1
          : Math.max(0, prevGuests[type] - 1),
    }));
  };

  const toggleExpanded = (setter) => () => {
    setter((prev) => !prev);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAvailableRooms();
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Find Available Rooms</h2>
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
                                onClick={updateGuests(
                                  type.toLowerCase(),
                                  "decrease"
                                )}
                              >
                                -
                              </button>
                              <span className="btn btn-light border border-dark disabled">
                                {guests[type.toLowerCase()]}
                              </span>
                              <button
                                className="btn btn-light border border-dark"
                                onClick={updateGuests(
                                  type.toLowerCase(),
                                  "increase"
                                )}
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
                {
                  state: checkInDate,
                  setter: setCheckInDate,
                  label: "Check-in",
                },
                {
                  state: checkOutDate,
                  setter: setCheckOutDate,
                  label: "Check-out",
                },
              ].map(({ state, setter, label }) => (
                <div key={label} className="col-lg-4 mb-3">
                  <button
                    className="btn btn-light border border-dark w-100"
                    onClick={toggleExpanded(setIsCalendarExpanded)}
                    type="button"
                  >
                    {label}: {new Date(state).toLocaleDateString()}
                  </button>
                  {isCalendarExpanded && (
                    <div className="mt-2">
                      <label className="form-label">{label} Date:</label>
                      <input
                        type="date"
                        className="form-control"
                        value={state}
                        onChange={(e) => setter(e.target.value)}
                      />
                    </div>
                  )}
                </div>
              ))}
              <div className="col-12 mt-1 text-end">
                <button type="submit" className="btn btn-primary px-4">
                  Search Rooms
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Move the Submit Button to the Right */}
      </form>

      {/* Available Rooms */}
      <div className="mt-5">
        <Select_Rooms
          availableRooms={availableRooms}
          guests={guests}
          checkInDate={checkInDate}
          checkOutDate={checkOutDate}
        />
      </div>
    </div>
  );
};
