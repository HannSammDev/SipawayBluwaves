import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { textDB } from "../../../firebase";
import { Button, Modal, Form, Pagination } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { BsThreeDotsVertical } from "react-icons/bs";
import {
  faCheck,
  faCheckCircle,
  faEllipsis,
  faEye,
  faSignOutAlt,
} from "@fortawesome/free-solid-svg-icons";
// import { ThreeDots } from 'react-bootstrap-icons';
import Dropdown from "react-bootstrap/Dropdown";

// import DropdownButton from "react-bootstrap/DropdownButton";
import { AddCheckin } from "./addCheckin";

export const Reservationss = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(null);
  const [actionType, setActionType] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 5;
  const [lgShow, setLgShow] = useState(false);

  // Fetch reservations from Firestore
  const getReservation = async () => {
    try {
      const reservationsCollection = collection(textDB, "guestData");
      const reservationSnapshot = await getDocs(reservationsCollection);
      const reservationList = reservationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(reservationList);
      console.log("Fetched reservations: ", reservationList); // Log the fetched reservations
    } catch (error) {
      console.error("Error fetching reservations: ", error);
    }
  };

  useEffect(() => {
    getReservation();
  }, []);

  const handleShowModal = (guest) => {
    setCurrentGuest(guest);
    setShowModal(true);
  };

  const handleShowConfirmModal = (action) => {
    setActionType(action);
    setShowConfirmModal(true);
  };

  const handleInputChange = (field, value) => {
    setCurrentGuest((prev) => ({ ...prev, [field]: value }));
  };

  const handleAction = async () => {
    const guestRef = doc(textDB, "guestData", currentGuest.id);
    try {
      if (actionType === "checkIn") {
        await updateDoc(guestRef, { checkedIn: true });
      } else if (actionType === "checkOut") {
        await updateDoc(guestRef, { checkedOut: true });
      }
      getReservation();
      setShowConfirmModal(false);
      setShowModal(false);
    } catch (error) {
      console.error("Error updating reservation: ", error);
    }
  };

  const filteredGuests = reservations.filter(
    (guest) =>
      guest.guestDetails?.firstname &&
      guest.guestDetails.firstname
        .toLowerCase()
        .includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(
    indexOfFirstGuest,
    indexOfLastGuest
  );
  const totalPages = Math.ceil(filteredGuests.length / guestsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item
        key={number}
        active={number === currentPage}
        onClick={() => paginate(number)}
      >
        {number}
      </Pagination.Item>
    );
  }

  return (
    <div>
      <div
        className="d-flex justify-content-between mb-4"
        style={{
          borderRadius: "10px",
          boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)",
          padding: "8px",
        }}
      >
        <Button variant="transparent" onClick={() => setLgShow(true)}>
          <h5>+ Guest</h5>
        </Button>
        <Form.Control
          type="text"
          placeholder="Search by guest name..."
          className="w-25"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1); // Reset to the first page on search
          }}
        />
      </div>

      <Modal
        size="lg"
        show={lgShow}
        onHide={() => setLgShow(false)}
        aria-labelledby="example-modal-sizes-title-lg"
      >
        <Modal.Header closeButton>
          
        </Modal.Header>
        <Modal.Body>
          <AddCheckin />
        </Modal.Body>
      </Modal>
      <Table striped>
        <thead>
          <tr>
            <th>#</th>
            <th>Assets</th>
            <th>Guest</th>

            <th>Reservation Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentGuests.map((reservation, index) => (
            <tr key={reservation.id}>
              <td>{index + 1}</td>
              <td>
                {reservation.roomname} {reservation.cottagename}
              </td>

              <td>{`${reservation.guestDetails?.firstname || ""} ${
                reservation.guestDetails?.lastname || ""
              }`}</td>

              <td>
                {reservation.checkInDate} - {reservation.checkOutDate}
              </td>
              <td>
                {reservation.checkedOut ? (
                  <span className="bg-success text-white p-1 rounded">
                    Checked-Out
                  </span>
                ) : reservation.checkedIn ? (
                  <span className="bg-warning text-dark p-1 rounded">
                    Checked-IN
                  </span>
                ) : (
                  <span className="text-danger">Not Checked-IN</span>
                )}
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => handleShowOptions(reservation)}
                ></Button>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  <Dropdown>
                    <Dropdown.Toggle variant="link" id="dropdown-basic-button">
                      {/* <BsThreeDotsVertical /> */}
                    </Dropdown.Toggle>

                    <Dropdown.Menu>
                      <Dropdown.Item href="#/action-1">
                        <Button
                          size="sm"
                          onClick={() => handleShowModal(reservation)}
                          variant="transparent"
                          className="me-2"
                        >
                          View
                          {/* <FontAwesomeIcon icon={faEye} className="me-1" /> */}
                        </Button>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        {!reservation.checkedIn && (
                          <Button
                            size="sm"
                            onClick={() => handleShowConfirmModal("checkIn")}
                            variant="link"
                            className="me-2"
                          >
                            <FontAwesomeIcon
                              icon={faCheckCircle}
                              className="me-1"
                            />{" "}
                            Check-In
                          </Button>
                        )}
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-3">
                        {!reservation.checkedOut && (
                          <Button
                            //  className="border border-dark"
                            size="sm"
                            onClick={() => handleShowConfirmModal("checkOut")}
                            variant="link"
                          >
                            <FontAwesomeIcon
                              icon={faSignOutAlt}
                              className="me-1"
                            />{" "}
                            Checkout
                          </Button>
                        )}
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Pagination className="d-flex justify-content-center">
        {paginationItems}
      </Pagination>

      {/* Modals for confirming actions */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === "checkIn"
              ? "Confirm Check-In"
              : "Confirm Check-Out"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to {actionType} this guest?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleAction}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal to view guest details */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Guest Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentGuest && (
            <div>
              <p>
                <strong>Name:</strong>{" "}
                {`${currentGuest.guestDetails?.firstname} ${currentGuest.guestDetails?.lastname}`}
              </p>
              <p>
                <strong>Room:</strong> {currentGuest.roomname}
              </p>
              <p>
                <strong>Check-In Date:</strong> {currentGuest.checkInDate}
              </p>
              <p>
                <strong>Check-Out Date:</strong> {currentGuest.checkOutDate}
              </p>
              <p>
                <strong>Balance:</strong> ₱{currentGuest.balance}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {currentGuest.checkedIn ? "Checked-In" : "Not Checked-In"}
              </p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
