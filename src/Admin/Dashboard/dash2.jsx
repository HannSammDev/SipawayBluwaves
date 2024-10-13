import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState, useEffect } from "react";
import {
  faDoorClosed,
  faHouse,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getDocs, collection } from "firebase/firestore";
import { textDB } from "../../firebase";

export const Dashtwo = () => {
  const [rooms, setRooms] = useState([]);
  const [cottage, setCottage] = useState([]);
  const [totalGuests, setTotalGuests] = useState(0);

  const getRoomData = async () => {
    const roomCollection = collection(textDB, "rooms");
    const roomSnapshot = await getDocs(roomCollection);
    const roomList = roomSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRooms(roomList);
  };

  const getCottageData = async () => {
    const cottageCollection = collection(textDB, "cottages");
    const cottageSnapshot = await getDocs(cottageCollection);
    const cottageList = cottageSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setCottage(cottageList);
  };

  const getGuestData = async () => {
    const guestCollection = collection(textDB, "reservations");
    const guestSnapshot = await getDocs(guestCollection);
    const guestList = guestSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    const totalGuestsCount = guestList.reduce((acc, guest) => {
      return acc + (guest.guests.adults || 0) + (guest.guests.children || 0);
    }, 0);

    setTotalGuests(totalGuestsCount);
  };

  useEffect(() => {
    getRoomData();
    getCottageData();
    getGuestData();
  }, []);

  return (
    <div className="container-fluid">
      <div className="card-group">
        {/* Rooms Card */}
        <div
          className="card"
          style={{
            margin: "10px",
            borderRadius: "12px",
            // background: "linear-gradient(135deg, #3a73b7, #5a8fc4)",
            boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="card-body">
            <h5 className="card-title text-dark fs-4 d-flex justify-content-between align-items-center">
              Rooms
              <FontAwesomeIcon icon={faDoorClosed} className="fs-2" />
            </h5>
            <p className="card-text text-dark display-3 fw-bold">
              {rooms.length}
            </p>
          </div>
        </div>

        {/* Cottages Card */}
        <div
          className="card"
          style={{
            margin: "10px",
            borderRadius: "12px",
            // background: "linear-gradient(135deg, #92DFF3, #61AEEB)",
            boxShadow: "0 5px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="card-body">
            <h5 className="card-title fs-4 d-flex justify-content-between align-items-center text-dark">
              Cottages
              <FontAwesomeIcon icon={faHouse} className="fs-2" />
            </h5>
            <p className="card-text display-3 fw-bold text-dark">
              {cottage.length}
            </p>
          </div>
        </div>

        {/* Guests Card */}
        <div
          className="card"
          style={{
            margin: "10px",
            borderRadius: "12px",
            // background: "linear-gradient(135deg, #FFD58C, #FCA469)",
            boxShadow: "0px 5px 20px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div className="card-body">
            <h5 className="card-title fs-4 d-flex justify-content-between align-items-center text-dark">
              Guests
              <FontAwesomeIcon icon={faUser} className="fs-2" />
            </h5>
            <p className="card-text display-3 fw-bold text-dark">
              {totalGuests}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
