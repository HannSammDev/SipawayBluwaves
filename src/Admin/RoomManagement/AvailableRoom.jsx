import React, { useState, useEffect } from "react";
import { Addrooms } from "./Addrooms";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  updateDoc,
  addDoc,
} from "firebase/firestore";
import { textDB } from "../../firebase"; // Ensure this path is correct
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faEye,
  // faPlus,
} from "@fortawesome/free-solid-svg-icons";

export const Available_rooms = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // --------------------------------
  const [rooms, setRooms] = useState([]);
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  const [isConfirmed, setIsConfirmed] = useState(false); // New state for tracking confirmation
  const [isDeclined, setIsDeclined] = useState(false); // New state for tracking decline action
  const [isExpanded, setIsExpanded] = useState(false);

  const fetchReservations = async () => {
    try {
      const reservationsCollection = collection(textDB, "reservations");
      const reservationsSnapshot = await getDocs(reservationsCollection);
      const reservationsList = reservationsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Reservations: ", reservationsList); // Log fetched reservations data
      setReservations(reservationsList);
    } catch (error) {
      console.error("Error fetching reservations: ", error);
    }
  };

  const fetchRooms = async () => {
    try {
      const roomCollection = collection(textDB, "rooms");
      const roomData = await getDocs(roomCollection);
      const roomsArray = roomData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Rooms: ", roomsArray); // Log fetched rooms data
      setRooms(roomsArray);
    } catch (error) {
      console.error("Error fetching rooms: ", error);
    }
  };

  useEffect(() => {
    fetchRooms();
    fetchReservations();
  }, []);

  const handleDelete = async (roomId) => {
    try {
      await deleteDoc(doc(textDB, "rooms", roomId));
      setRooms(rooms.filter((room) => room.id !== roomId));
      console.log("Room deleted successfully!");
    } catch (error) {
      console.error("Error deleting room: ", error);
      alert("There was an error deleting the room. Please try again.");
    }
  };

  const handleViewClick = (roomId) => {
    const roomReservations = reservations.filter(
      (reservation) => reservation.roomId === roomId
    );
    console.log("Room Reservations: ", roomReservations); // Log room reservations for selected room
    setSelectedRoom(roomReservations);
  };

  const handleEdit = (roomId) => {
    navigate(`/editroom/${roomId}`);
  };

  // Updated handleConfirmReservation function
  const handleConfirmReservation = async () => {
    if (!selectedRoom || selectedRoom.length === 0) {
      setConfirmationMessage("No room selected for reservation.");
      return;
    }

    const reservationDetails = selectedRoom[0]; // Get the first selected room's reservation details
    const guestDetails = reservationDetails.guestDetails;

    if (!guestDetails) {
      setConfirmationMessage("Guest details are missing.");
      return;
    }

    // Check if guests object exists in guestDetails
    const guests = guestDetails.guests || { adults: 0, children: 0 };

    // Get room details from the rooms array using the roomId from reservationDetails
    const roomDetails = rooms.find(
      (room) => room.id === reservationDetails.roomId
    );
    if (!roomDetails) {
      setConfirmationMessage("Room details not found.");
      return;
    }

    setIsLoading(true); // Start loading spinner

    try {
      // Add the guest data to the 'guestData' collection in Firestore
      const guestData = await addDoc(collection(textDB, "guestData"), {
        roomId: reservationDetails.roomId,
        roomName: roomDetails.roomname, // Use the roomName from roomDetails
        guestName: `${guestDetails.firstname} ${guestDetails.lastname}`,
        guests: `${guests.adults} adults, ${guests.children} children`,
        checkInDate: reservationDetails.checkInDate,
        checkOutDate: reservationDetails.checkOutDate,
        specialCode: guestDetails.specialCode || "", // Add any specific fields you may want to store
        roomPrice: reservationDetails.roomPrice,
        fiftyPercentPrice: reservationDetails.roomPrice * 0.5,
        balance: reservationDetails.roomPrice * 0.5,
      });

      console.log("Guest Data added with ID", guestData.id);

      // Create a query to get the pending reservation for the selected room
      const reservationQuery = query(
        collection(textDB, "reservations"),
        where("roomId", "==", reservationDetails.roomId),
        where("availability", "==", "Pending") // Check for pending reservations
      );

      const querySnapshot = await getDocs(reservationQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const reservationId = docSnapshot.id;

          // Update the reservation availability to "Reserved"
          const reservationRef = doc(textDB, "reservations", reservationId);
          await updateDoc(reservationRef, { availability: "Reserved" });

          console.log(
            "Reservation updated to 'Reserved' with ID:",
            reservationId
          );
        });

        setTimeout(() => {
          setIsLoading(false); // Stop loading spinner
          setConfirmationMessage("Reservation confirmed successfully!");
          setIsConfirmed(true); // Set confirmation state to true
          document.getElementById("closeModalButton").click(); // Close the modal
          fetchReservations();
        }, 2000);
      } else {
        setIsLoading(false);
        setConfirmationMessage("No pending reservation found for this room.");
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
      setConfirmationMessage("Error confirming reservation. Please try again.");
      setIsLoading(false);
    }
  };

  // New handleDeclineReservation function to delete the reservation
  const handleDeclineReservation = async () => {
    if (!selectedRoom || selectedRoom.length === 0) {
      setConfirmationMessage("No room selected for reservation.");
      return;
    }

    const reservationDetails = selectedRoom[0]; // Get the first selected room's reservation details

    setIsLoading(true); // Start loading spinner

    try {
      // Create a query to get the pending reservation for the selected room
      const reservationQuery = query(
        collection(textDB, "reservations"),
        where("roomId", "==", reservationDetails.roomId),
        where("availability", "==", "Pending") // Check for pending reservations
      );

      const querySnapshot = await getDocs(reservationQuery);

      if (!querySnapshot.empty) {
        querySnapshot.forEach(async (docSnapshot) => {
          const reservationId = docSnapshot.id;

          // Delete the reservation document from Firestore
          const reservationRef = doc(textDB, "reservations", reservationId);
          await deleteDoc(reservationRef);

          console.log("Reservation deleted with ID:", reservationId);
        });

        setTimeout(() => {
          setIsLoading(false); // Stop loading spinner
          setConfirmationMessage("Reservation declined successfully.");
          setIsDeclined(true); // Set declined state to true
          document.getElementById("closeModalButton").click(); // Close the modal
          fetchReservations(); // Refresh the reservations to reflect the deletion
        }, 2000);
      } else {
        setIsLoading(false);
        setConfirmationMessage("No pending reservation found for this room.");
      }
    } catch (error) {
      console.error("Error declining and deleting reservation:", error);
      setConfirmationMessage("Error declining reservation. Please try again.");
      setIsLoading(false);
    }
  };

  const toggleDetails = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className="container-fluid">
        <div
          className="mt-4 mb-3"
          style={{
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
            padding: "8px",
            borderRadius: "10px",
          }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <h4>Rooms</h4>
            {/* <a className="btn btn-dark" href="/addroom">
              <FontAwesomeIcon icon={faPlus} /> Add
            </a> */}
            <Button variant="dark" onClick={handleShow}>
              Add
            </Button>
          </div>
        </div>
        <div
          className="table-responsive mt-2"
          style={{
            boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
            padding: "1em",
            borderRadius: "10px",
          }}
        >
          <Modal size='lg' show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>
               
                <h5 className="mb-0 text-dark">
                  <i className="bi bi-pencil-square"></i> Add Room
                </h5>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Addrooms />
            </Modal.Body>
          </Modal>
          <table
            className="table table-striped"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Room </th>
                <th scope="col">Description</th>
                <th scope="col">Amenities</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {rooms.map((room, index) => (
                <tr key={room.id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ maxWidth: "5px" }}>
                    {room.roomname}
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
                            className={`carousel-item ${
                              i === 0 ? "active" : ""
                            }`}
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
                  <td>{room.description}</td>
                  <td>
                    <ul>
                      {room.amenities.split(",").map((amenity, i) => (
                        <li key={i}>{amenity}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{room.price}</td>
                  <td>
                    {reservations.some(
                      (reservation) => reservation.roomId === room.id
                    )
                      ? reservations
                          .filter(
                            (reservation) => reservation.roomId === room.id
                          )
                          .map((reservation) => (
                            <div key={reservation.id}>
                              {reservation.status}
                            </div>
                          ))
                      : "Available"}
                  </td>
                  <td>
                    <div className="btn-group">
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

                      <button
                        className="btn "
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModalToggle"
                        onClick={() => handleViewClick(room.id)}
                      >
                        <FontAwesomeIcon icon={faEye} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            className="modal fade"
            id="exampleModalToggle"
            aria-hidden="true"
            aria-labelledby="exampleModalToggleLabel"
            tabIndex="-1"
          >
            <div className="modal-dialog modal-lg modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title" id="exampleModalToggleLabel">
                    Room Reservations Details
                  </h5>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                    id="closeModalButton"
                  ></button>
                </div>
                <div className="modal-body">
                  {isLoading ? (
                    <div className="d-flex justify-content-center">
                      <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                      </div>
                    </div>
                  ) : selectedRoom && selectedRoom.length > 0 ? (
                    selectedRoom.map((reservation) => (
                      <div
                        key={reservation.id}
                        className="p-3 mb-4 bg-light rounded shadow-sm"
                      >
                        <button
                          style={{ textDecoration: "none" }}
                          className="btn btn-link"
                          type="button"
                          data-bs-toggle="collapse"
                          data-bs-target={`#details${reservation.id}`}
                          aria-expanded={isExpanded}
                          aria-controls={`details${reservation.id}`}
                          onClick={toggleDetails}
                        >
                          {isExpanded ? (
                            <span className="text-danger ">Show Less</span>
                          ) : (
                            "Show Details"
                          )}
                        </button>

                        <div
                          id={`details${reservation.id}`}
                          className="collapse"
                        >
                          <p>
                            <strong>Guest Name:</strong>{" "}
                            {reservation.guestDetails.firstname}{" "}
                            {reservation.guestDetails.lastname}
                          </p>
                          <p>
                            <strong>Adult:</strong> {reservation.guests.adults}
                            {" || "}
                            <strong>Chidren:</strong>{" "}
                            {reservation.guests.children}
                          </p>
                          <p>
                            <strong>Check-In Date:</strong>{" "}
                            {reservation.checkInDate}
                          </p>
                          <p>
                            <strong>Check-Out Date:</strong>{" "}
                            {reservation.checkOutDate}
                          </p>
                          <p>
                            <strong>Payment Method:</strong>{" "}
                            {reservation.paymentMethod}
                          </p>
                          <p>
                            <strong>Room Price:</strong> $
                            {reservation.roomPrice}
                          </p>
                          <p>
                            <strong>Contact:</strong>{" "}
                            {reservation.guestDetails.email} |{" "}
                            {reservation.guestDetails.phoneNumber}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="alert alert-info">
                      No reservations for this room.
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmReservation}
                    disabled={
                      !selectedRoom || selectedRoom.length === 0 || isConfirmed
                    }
                  >
                    {selectedRoom && selectedRoom.length > 0
                      ? selectedRoom[0].availability === "Reserved"
                        ? "Done"
                        : "Confirm"
                      : "Confirm"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeclineReservation}
                    disabled={
                      !selectedRoom || selectedRoom.length === 0 || isDeclined
                    }
                  >
                    Decline
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {confirmationMessage && (
          <div className="alert alert-success mt-3">{confirmationMessage}</div>
        )}
      </div>
    </>
  );
};
