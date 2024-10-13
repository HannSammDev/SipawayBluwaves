import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt, faEye } from "@fortawesome/free-solid-svg-icons";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { textDB } from "../../firebase";
import { useNavigate } from "react-router-dom";

export const RoomDetails = () => {
  const [rooms, setRooms] = useState([]);
  const [roomDelete, setroomDelete] = useState("");
  const navigate = useNavigate();

  const getData = async () => {
    const roomCollection = collection(textDB, "rooms");
    const roomSnapshot = await getDocs(roomCollection);
    const roomList = roomSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setRooms(roomList);
  };

  const handleDelete = async (roomId) => {
    try {
      await deleteDoc(doc(textDB, "rooms", roomId));
      setRooms(rooms.filter((room) => room.id !== roomId));
      console.log("Room deleted successfully!");
      setroomDelete("Room deleted successfully!");
    } catch (error) {
      console.error("Error deleting room: ", error);
      alert("There was an error deleting the room. Please try again.");
    }
  };

  const handleEdit = (roomId) => {
    navigate(`/editroom/${roomId}`);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container-fluid mt-4">
      {/* <h1 className="mb-3">Room Details</h1> */}
      {roomDelete && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
          style={{ backgroundColor: "#fd5c63", color: "white" }} // Add inline style here
        >
          {roomDelete}
          <button
            type="button"
            className="btn-close"
            onClick={() => setroomDelete("")}
            aria-label="Close"
          ></button>
        </div>
      )}
      <div
        className="table table-responsive"
        style={{
          boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
          padding: "1em",
          borderRadius: "5px",
          backgroundColor: "#f5f5f5",
        }}
      >
        <a className="btn btn-primary mb-3" href="/addroom">
          Add Room
        </a>
        <table className="table table-striped">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Room_Name</th>
              <th scope="col">Description</th>
              <th scope="col">Amenities</th>
              <th scope="col">Price</th>
              <th scope="col">Images</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {rooms.map((room, index) => (
              <tr key={room.id}>
                <th scope="row">{index + 1} </th>
                <td>{room.roomname}</td>
                <td>{room.description}</td>
                <td>
                  <ul>
                    {room.amenities.split(",").map((amenity, i) => (
                      <li key={i}>{amenity}</li>
                    ))}
                  </ul>
                </td>
                <td>₱ {room.price}</td>
                <td style={{ maxWidth: "200px" }}>
                  <div
                    id={`roomCarousel${index}`}
                    className="carousel slide"
                    data-bs-ride="carousel"
                    style={{ width: "100%", height: "auto" }}
                  >
                    <div className="carousel-inner">
                      {room.images.map((image, i) => (
                        <div
                          key={i}
                          className={`carousel-item ${i === 0 ? "active" : ""}`}
                        >
                          <img
                            src={image}
                            className="d-block w-100"
                            alt={`Room Image ${i + 1}`}
                          />
                        </div>
                      ))}
                    </div>
                    <button
                      className="carousel-control-prev"
                      type="button"
                      data-bs-target={`#roomCarousel${index}`}
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
                      type="button"
                      data-bs-target={`#roomCarousel${index}`}
                      data-bs-slide="next"
                    >
                      <span
                        className="carousel-control-next-icon"
                        aria-hidden="true"
                      ></span>
                      <span className="visually-hidden">Next</span>
                    </button>
                  </div>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleDelete(room.id)}
                    >
                      <FontAwesomeIcon
                        icon={faTrashAlt}
                        style={{ color: "red" }}
                      />
                    </button>
                    <button
                      type="button"
                      className="btn"
                      onClick={() => handleEdit(room.id)}
                    >
                      <FontAwesomeIcon
                        icon={faEdit}
                        style={{ color: "#FFA500" }}
                      />
                    </button>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn btn-lg dropdown-toggle"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        Actions
                      </button>
                      <ul className="dropdown-menu">
                        <li>
                          <a
                            href={`/checkin/${room.id}`}
                            className="dropdown-item"
                          >
                            Checkin
                          </a>
                        </li>
                        <li>
                          <a
                            href={`/checkout/${room.id}`}
                            className="dropdown-item"
                          >
                            Checkout
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
