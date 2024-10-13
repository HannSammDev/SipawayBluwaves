import React, { useState, useEffect } from "react";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";
import { textDB } from "../../firebase";
import { useNavigate } from "react-router-dom";

function Rooms() {
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const roomsCollection = collection(textDB, "rooms");
        const roomSnapshot = await getDocs(roomsCollection);
        const roomList = roomSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRooms(roomList);
      } catch (error) {
        console.error("Error fetching rooms: ", error);
      }
    };

    fetchRooms();
  }, []);

  const handleReserve = (room) => {
    navigate("/guest", { state: room });
  };

  return (
    <>
      <div>
        <h2 id="rooms">Rooms</h2>
        {rooms.map((room, index) => (
          <div className="cards col-md-4" key={room.id}>
            <div className="row" style={{ width: "100%" }}>
              <div
                id={`carousel${index}`}
                className="carousel slide"
                data-bs-ride="carousel"
              >
                <div className="carousel-indicators">
                  {room.images.map((_, idx) => (
                    <button
                      key={idx}
                      data-bs-target={`#carousel${index}`}
                      aria-label={`Slide ${idx + 1}`}
                      aria-current={idx === 0 ? "true" : "false"}
                      className={idx === 0 ? "active" : ""}
                      data-bs-slide-to={idx}
                    ></button>
                  ))}
                </div>
                <div className="carousel-inner">
                  {room.images.map((url, idx) => (
                    <div
                      className={`carousel-item ${idx === 0 ? "active" : ""}`}
                      key={idx}
                    >
                      <img
                        className="image d-block w-100"
                        src={url}
                        alt={`Slide ${idx + 1}`}
                      />
                    </div>
                  ))}
                </div>
                <button
                  className="carousel-control-prev"
                  data-bs-target={`#carousel${index}`}
                  data-bs-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Previous</span>
                </button>
                <button
                  className="carousel-control-next"
                  data-bs-target={`#carousel${index}`}
                  data-bs-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  ></span>
                  <span className="visually-hidden">Next</span>
                </button>
              </div>
              <div
                className="card-body"
                style={{ textAlign: "justify", marginLeft: "15px" }}
              >
                <h4>{room.roomname}</h4>
                <h4 className="btn price">
                  <b>₱ {room.price} </b>
                </h4>
                <h5
                  className="fs-6"
                  style={{ color: "grey", fontFamily: "arial" }}
                >
                  {room.description}
                </h5>
                {room.amenities.split(",").map((amenity, i) => (
                  <li key={i}>{amenity}</li>
                ))}
                <button
                  className="btn btn-primary"
                  style={{ float: "right" }}
                  onClick={() => handleReserve(room)}
                  disabled={room.availability === "Reserved"}
                >
                  {room.availability === "Reserved"
                    ? "Not Available"
                    : "Reserve"}
                </button>
              </div>
            </div>
          </div>
        ))}
        <hr />
      </div>
    </>
  );
}

export default Rooms;
