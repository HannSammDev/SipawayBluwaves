import {
  // faEdit,
  faTrashAlt,
  faEye,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Pagination } from "react-bootstrap";
import { textDB } from "../../firebase";

export const Guest_List = () => {
  const [guests, setGuests] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(null);

  // New states for search and pagination
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Pagination variables
  const guestsPerPage = 5; // Guests per page

  // Fetch the guest data
  const fetchGuestdata = async () => {
    try {
      const guestCollection = collection(textDB, "guestData");
      const guestSnapshot = await getDocs(guestCollection);
      const guestList = guestSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      console.log("Fetched Guests", guestList);
      setGuests(guestList);
    } catch (error) {
      console.log("Error Fetching Guests", error);
    }
  };

  // Use effect to call fetchGuestdata when the component mounts
  useEffect(() => {
    fetchGuestdata();
  }, []);

  // Handle search input change
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page on new search
  };

  // Function to handle Check-In
  const handleCheckIn = (guest) => {
    setCurrentGuest({
      ...guest,
      checkInDate: new Date().toISOString().split("T")[0],
    });
    setShowModal(true);
  };

  // Function to handle input changes for the modal
  const handleInputChange = (field, value) => {
    setCurrentGuest((prevGuest) => ({
      ...prevGuest,
      [field]: value,
    }));
  };

  // Function to save Check-In
  const saveCheckIn = async () => {
    try {
      const guestDocRef = doc(textDB, "guestData", currentGuest.id);

      if (currentGuest.checkedIn && !currentGuest.checkedOut) {
        await updateDoc(guestDocRef, {
          checkedOut: true,
          checkOutDate: new Date().toISOString().split("T")[0],
        });

        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === currentGuest.id
              ? { ...guest, checkedOut: true }
              : guest
          )
        );
      } else if (!currentGuest.checkedIn) {
        await updateDoc(guestDocRef, {
          checkedIn: true,
          checkInDate: currentGuest.checkInDate,
          checkOutDate: currentGuest.checkOutDate,
          balance: currentGuest.balance,
          checkedOut: false,
        });

        setGuests((prevGuests) =>
          prevGuests.map((guest) =>
            guest.id === currentGuest.id
              ? {
                  ...guest,
                  ...currentGuest,
                  checkedIn: true,
                  checkedOut: false,
                }
              : guest
          )
        );
      }
    } catch (error) {
      console.error("Error saving check-in:", error);
    }
  };

  // Delete Guest
  const handleDelete = async (guestDataId) => {
    try {
      const guestDocRef = doc(textDB, "guestData", guestDataId);
      await deleteDoc(guestDocRef);

      setGuests((prevGuests) => prevGuests.filter((guest) => guest.id !== guestDataId));
      console.log("Guest Deleted");
    } catch (error) {
      console.log("Not Deleted", error);
    }
  };

  // Filter guests based on search term
  const filteredGuests = guests.filter((guest) => {
    const fullName = `${guest.guestDetails?.firstname || ""} ${guest.guestDetails?.lastname || ""}`;
    return fullName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  // Calculate the current page guests
  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(indexOfFirstGuest, indexOfLastGuest);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Pagination component
  const paginationItems = [];
  for (let number = 1; number <= Math.ceil(filteredGuests.length / guestsPerPage); number++) {
    paginationItems.push(
      <Pagination.Item key={number} active={number === currentPage} onClick={() => paginate(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between mb-4" style={{ borderRadius: "10px", boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)", padding: "8px" }}>
          <h5>
            <a href="#" className="btn btn-link">
              <FontAwesomeIcon icon={faPlus} />
            </a>
            Guest List
          </h5>

          {/* Search bar */}
          <Form.Control
            type="text"
            placeholder="Search by guest name..."
            className="w-25"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div style={{ boxShadow: "0px 0px 10px 5px rgba(0, 0, 0, 0.1)", padding: "8px", borderRadius: "10px" }}>
          <Table striped hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Room</th>
                <th>Cottage</th>
                <th>Price</th>
                <th>50% Paid</th>
                <th>Balance</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentGuests.length > 0 ? (
                currentGuests.map((guest, index) => (
                  <tr key={guest.id}>
                    <td>{indexOfFirstGuest + index + 1}</td>
                    <td>
                      <span className="fw-bold me-2">{guest.guestDetails?.firstname} {guest.guestDetails?.lastname}</span>
                      {"|| "}
                      <span className="text-muted">{guest.guests.adults} Adults, {guest.guests.children} Children</span>
                    </td>
                    <td>{guest.roomname}</td>
                    <td>{guest.cottageName}</td>
                    <td>₱ {guest.roomPrice}</td>
                    <td>₱ {guest.fiftyPercentPrice}</td>
                    <td>₱ {guest.balance}</td>
                    <td>
                      {guest.checkedOut ? (
                        <span className="fs-6 text-bold text-white p-1 rounded" style={{ backgroundColor: "green" }}>
                          <small className="fw-bold">Checked-Out</small>
                        </span>
                      ) : guest.checkedIn ? (
                        <span className="bg-warning fs-6 text-bold p-1 rounded">
                          <small className="fw-bold">Checked-IN</small>
                        </span>
                      ) : (
                        <span className="text-danger">
                          <small className="fw-bold">Not Checked-IN</small>
                        </span>
                      )}
                    </td>
                    <td>
                      <Button variant="" size="sm" className="mr-2" onClick={() => handleDelete(guest.id)}> 
                        <FontAwesomeIcon style={{ color: "red" }} icon={faTrashAlt} />
                      </Button>
                      <Button className="text-success" variant="link" size="sm" onClick={() => handleCheckIn(guest)}>
                        <FontAwesomeIcon icon={faEye} />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="9" className="text-center">
                    No guests found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          <Pagination>{paginationItems}</Pagination>

          {/* Check-In Modal */}
          <Modal show={showModal} onHide={() => setShowModal(false)} centered>
            <Modal.Header closeButton className="border-0">
              <Modal.Title className="fw-bold text-primary">
                {currentGuest?.checkedIn ? "Check-Out" : "Check-In"} Guest
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {/* Guest Name Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Guest Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={`${currentGuest?.guestDetails?.firstname || ""} ${currentGuest?.guestDetails?.lastname || ""}`}
                    readOnly
                  />
                </Form.Group>
                {/* Balance Field */}
                <Form.Group className="mb-3">
                  <Form.Label>Balance</Form.Label>
                  <Form.Control
                    type="number"
                    value={currentGuest?.balance || 0}
                    onChange={(e) => handleInputChange("balance", e.target.value)}
                  />
                </Form.Group>
                {/* Check-In Date */}
                {currentGuest && !currentGuest.checkedOut && (
                  <Form.Group className="mb-3">
                    <Form.Label>Check-In Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={currentGuest.checkInDate || ""}
                      onChange={(e) => handleInputChange("checkInDate", e.target.value)}
                    />
                  </Form.Group>
                )}
                {/* Check-Out Date */}
                {currentGuest && currentGuest.checkedIn && (
                  <Form.Group className="mb-3">
                    <Form.Label>Check-Out Date</Form.Label>
                    <Form.Control
                      type="date"
                      value={currentGuest.checkOutDate || ""}
                      onChange={(e) => handleInputChange("checkOutDate", e.target.value)}
                    />
                  </Form.Group>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer className="border-0">
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button
                variant="primary"
                onClick={saveCheckIn}
              >
                {currentGuest?.checkedIn ? "Confirm Check-Out" : "Confirm Check-In"}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  );
};
