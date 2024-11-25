import React, { useState, useEffect } from "react";
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
import { AddCottages } from "./Addcottage";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEdit,
  faTrashAlt,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export const Available_cottages = () => {
  const [cottages, setCottages] = useState([]);
  const navigate = useNavigate();
  const [reservations, setReservations] = useState([]);
  const [selectedCottage, setSelectedCottage] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state for spinner
  const [isConfirmed, setIsConfirmed] = useState(false); // New state for tracking confirmation
  const [isDeclined, setIsDeclined] = useState(false); // New state for tracking decline action
  const [isExpanded, setIsExpanded] = useState(false);

  const [lgShow, setLgShow] = useState(false);

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

  const fetchCottages = async () => {
    try {
      const cottageCollection = collection(textDB, "cottages");
      const cottageData = await getDocs(cottageCollection);
      const cottagesArray = cottageData.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Cottages: ", cottagesArray); // Log fetched cottages data
      setCottages(cottagesArray);
    } catch (error) {
      console.error("Error fetching cottages: ", error);
    }
  };

  useEffect(() => {
    fetchCottages();
    fetchReservations();
  }, []);

  const handleDelete = async (cottageId) => {
    try {
      await deleteDoc(doc(textDB, "cottages", cottageId));
      setCottages(cottages.filter((cottage) => cottage.id !== cottageId));
      console.log("Cottage deleted successfully!");
    } catch (error) {
      console.error("Error deleting cottage: ", error);
      alert("There was an error deleting the cottage. Please try again.");
    }
  };

  const handleViewClick = (cottageId) => {
    const cottageReservations = reservations.filter(
      (reservation) => reservation.cottageId === cottageId
    );
    console.log("Cottage Reservations: ", cottageReservations); // Log cottage reservations for selected cottage
    setSelectedCottage(cottageReservations);
  };

  const handleEdit = (cottageId) => {
    navigate(`/editcottage/${cottageId}`);
  };

  // Updated handleConfirmReservation function
  const handleConfirmReservation = async () => {
    if (!selectedCottage || selectedCottage.length === 0) {
      setConfirmationMessage("No cottage selected for reservation.");
      return;
    }

    const reservationDetails = selectedCottage[0]; // Get the first selected cottage's reservation details
    const guestDetails = reservationDetails.guestDetails;

    if (!guestDetails) {
      setConfirmationMessage("Guest details are missing.");
      return;
    }

    // Check if guests object exists in guestDetails
    const guests = guestDetails.guests || { adults: 0, children: 0 };

    // Get cottage details from the cottages array using the cottageId from reservationDetails
    const cottageDetails = cottages.find(
      (cottage) => cottage.id === reservationDetails.cottageId
    );
    if (!cottageDetails) {
      setConfirmationMessage("Cottage details not found.");
      return;
    }

    setIsLoading(true); // Start loading spinner

    try {
      // Add the guest data to the 'guestData' collection in Firestore
      const guestData = await addDoc(collection(textDB, "guestData"), {
        cottageId: reservationDetails.cottageId,
        cottageName: cottageDetails.cottagename, // Use the cottageName from cottageDetails
        guestName: `${guestDetails.firstname} ${guestDetails.lastname}`,
        guests: `${guests.adults} adults, ${guests.children} children`,
        checkInDate: reservationDetails.checkInDate,
        checkOutDate: reservationDetails.checkOutDate,
        specialCode: guestDetails.specialCode || "", // Add any specific fields you may want to store
        cottagePrice: reservationDetails.cottagePrice,
        fiftyPercentPrice: reservationDetails.cottagePrice * 0.5,
        balance: reservationDetails.cottagePrice * 0.5,
      });

      console.log("Guest Data added with ID", guestData.id);

      // Create a query to get the pending reservation for the selected cottage
      const reservationQuery = query(
        collection(textDB, "reservations"),
        where("cottageId", "==", reservationDetails.cottageId),
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
        setConfirmationMessage(
          "No pending reservation found for this cottage."
        );
      }
    } catch (error) {
      console.error("Error confirming reservation:", error);
      setConfirmationMessage("Error confirming reservation. Please try again.");
      setIsLoading(false);
    }
  };

  // New handleDeclineReservation function to delete the reservation
  const handleDeclineReservation = async () => {
    if (!selectedCottage || selectedCottage.length === 0) {
      setConfirmationMessage("No cottage selected for reservation.");
      return;
    }

    const reservationDetails = selectedCottage[0]; // Get the first selected cottage's reservation details

    setIsLoading(true); // Start loading spinner

    try {
      // Create a query to get the pending reservation for the selected cottage
      const reservationQuery = query(
        collection(textDB, "reservations"),
        where("cottageId", "==", reservationDetails.cottageId),
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
        setConfirmationMessage(
          "No pending reservation found for this cottage."
        );
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
            <h4>Cottages</h4>

            <Button className="btn btn-dark" onClick={() => setLgShow(true)}>
            <FontAwesomeIcon icon={faPlus} /> Add
            </Button>

            <Modal
              size="lg"
              show={lgShow}
              onHide={() => setLgShow(false)}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <h5 className="mb-0 text-dark">
                  <i className="bi bi-pencil-square"></i> Add Cottage
                </h5>
              </Modal.Header>
              <Modal.Body>
                <AddCottages />
              </Modal.Body>
            </Modal>
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
          <table
            className="table table-striped"
            style={{ backgroundColor: "#f5f5f5" }}
          >
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Cottage</th>
                <th scope="col">Description</th>
                <th scope="col">Amenities</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cottages.map((cottage, index) => (
                <tr key={cottage.id}>
                  <th scope="row">{index + 1}</th>
                  <td style={{ maxWidth: "5px" }}>
                    {cottage.cottagename}
                    <div
                      id={`cottageCarousel${index}`}
                      className="carousel slide"
                      data-bs-ride="carousel"
                      style={{ width: "100%", height: "auto" }}
                    >
                      <div className="carousel-inner">
                        {cottage.images.map((image, i) => (
                          <div
                            key={i}
                            className={`carousel-item ${
                              i === 0 ? "active" : ""
                            }`}
                          >
                            <img
                              src={image}
                              className="d-block w-100"
                              alt={`Cottage Image ${i + 1}`}
                            />
                          </div>
                        ))}
                      </div>
                      <button
                        className="carousel-control-prev"
                        type="button"
                        data-bs-target={`#cottageCarousel${index}`}
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
                        data-bs-target={`#cottageCarousel${index}`}
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
                  <td>{cottage.description}</td>
                  <td>
                    <ul>
                      {cottage.amenities.split(",").map((amenity, i) => (
                        <li key={i}>{amenity}</li>
                      ))}
                    </ul>
                  </td>
                  <td>{cottage.price}</td>
                  <td>
                    {reservations.some(
                      (reservation) => reservation.cottageId === cottage.id
                    )
                      ? reservations
                          .filter(
                            (reservation) =>
                              reservation.cottageId === cottage.id
                          )
                          .map((reservation) => (
                            <div key={reservation.id}>
                              {reservation.availability}
                            </div>
                          ))
                      : "Available"}
                  </td>
                  <td>
                    <div className="btn-group">
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleDelete(cottage.id)}
                      >
                        <FontAwesomeIcon
                          icon={faTrashAlt}
                          style={{ color: "red" }}
                        />
                      </button>
                      <button
                        type="button"
                        className="btn"
                        onClick={() => handleEdit(cottage.id)}
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
                        onClick={() => handleViewClick(cottage.id)}
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
                    Cottage Reservations Details
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
                  ) : selectedCottage && selectedCottage.length > 0 ? (
                    selectedCottage.map((reservation) => (
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
                            <strong>Cottage Price:</strong> $
                            {reservation.cottagePrice}
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
                      No reservations for this cottage.
                    </div>
                  )}
                </div>
                <div className="modal-footer">
                  <button
                    className="btn btn-success"
                    onClick={handleConfirmReservation}
                    disabled={
                      !selectedCottage ||
                      selectedCottage.length === 0 ||
                      isConfirmed
                    }
                  >
                    {selectedCottage && selectedCottage.length > 0
                      ? selectedCottage[0].availability === "Reserved"
                        ? "Done"
                        : "Confirm"
                      : "Confirm"}
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={handleDeclineReservation}
                    disabled={
                      !selectedCottage ||
                      selectedCottage.length === 0 ||
                      isDeclined
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
