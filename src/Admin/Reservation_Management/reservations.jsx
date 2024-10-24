import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import { textDB } from "../../firebase";
import { Button, Modal, Form, Tabs, Tab } from "react-bootstrap";

function Reservation() {
  const [reservations, setReservations] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [currentGuest, setCurrentGuest] = useState(null); // State for the current guest

  const getReservation = async () => {
    const reservationsCollection = collection(textDB, "guestData");
    const reservationSnapshot = await getDocs(reservationsCollection);
    const reservationList = reservationSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReservations(reservationList);
  };
  const getPending = async () => {
    const pendingCollection = collection(textDB, "Peding");
    const pendingSnapshot = await getDocs(pendingCollection);
    const pendingList = pendingSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setPendings(pendingList);
  };
  useEffect(() => {
    getPending();
    getReservation();
  }, []);

  // Function to handle input change for the modal form
  const handleInputChange = (field, value) => {
    setCurrentGuest((prev) => ({ ...prev, [field]: value }));
  };

  // Open modal and set current guest details for editing or viewing
  const handleShowModal = (guest) => {
    setCurrentGuest(guest);
    setShowModal(true);
  };

  // Function to handle Check-In/Check-Out
  const saveCheckIn = async () => {
    if (!currentGuest) return;

    try {
      const guestDocRef = doc(textDB, "guestData", currentGuest.id);

      if (currentGuest.checkedIn && !currentGuest.checkedOut) {
        // Check-Out Logic
        await updateDoc(guestDocRef, {
          checkedOut: true,
          checkOutDate: new Date().toISOString().split("T")[0],
        });

        setReservations((prevReservations) =>
          prevReservations.map((guest) =>
            guest.id === currentGuest.id
              ? { ...guest, checkedOut: true }
              : guest
          )
        );
      } else if (!currentGuest.checkedIn) {
        // Check-In Logic
        await updateDoc(guestDocRef, {
          checkedIn: true,
          checkInDate: currentGuest.checkInDate,
          checkOutDate: currentGuest.checkOutDate,
          balance: currentGuest.balance,
          checkedOut: false,
        });

        setReservations((prevReservations) =>
          prevReservations.map((guest) =>
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

      setShowModal(false); // Close modal after save
    } catch (error) {
      console.error("Error saving check-in:", error);
    }
  };

  return (
    <>
      <Tabs
        variant="pills"
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab className="text-dark" eventKey="home" title="Pending">
          {/* Example placeholder data */}
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Guest</th>
                <th>Assets</th>
                <th>Price</th>
                <th>50% Paid</th>
                <th>Balance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendings.map((pending, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>
                    {pending.guestDetails.firstname}
                    {pending.guestDetails.lastname} {"|| "}
                    <span className="text-muted">
                      {pending.guests.adults}
                      {", Adults"} {pending.guests.children}
                      {" Children"}
                    </span>
                  </td>

                  <td>{pending.roomname}{pending.cottagename}</td>
                  <td></td>
                  <td>
                    <Button size="sm" variant="primary" className="me-1">
                      Confirm
                    </Button>
                    <Button size="sm" variant="danger">
                      Decline
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab className="text-dark" eventKey="profile" title="Reservations">
          <Table striped>
            <thead>
              <tr>
                <th>Reservation_ID</th>
                <th>Room</th>
                <th>Cottage</th>
                <th>Reservation Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {reservations.map((reservation) => (
                <tr key={reservation.id}>
                  <td>{reservation.id}</td>
                  <td>{reservation.roomName}</td>
                  <td>{reservation.cottageName}</td>
                  <td>
                    {reservation.checkInDate} - {reservation.checkOutDate}
                  </td>
                  <td>
                    {reservation.checkedOut ? (
                      <span
                        className="fs-6 text-bold text-white p-1 rounded"
                        style={{ backgroundColor: "green" }}
                      >
                        <small className="fw-bold">Checked-Out</small>
                      </span>
                    ) : reservation.checkedIn ? (
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
                    <Button
                      size="sm"
                      onClick={() => handleShowModal(reservation)}
                    >
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>
      </Tabs>

      {/* Modal for guest details */}
      {currentGuest && (
        <Modal show={showModal} onHide={() => setShowModal(false)} centered>
          <Modal.Header closeButton className="border-0">
            <Modal.Title className="fw-bold text-primary">
              Check-In Guest
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              {/* Guest Name Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Guest Name</Form.Label>
                <Form.Control
                  className="bg-light text-dark"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "0.375rem",
                  }}
                  type="text"
                  disabled
                  readOnly
                  value={currentGuest.guestName || ""}
                />
              </Form.Group>

              {/* Check-In Date Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Check-In Date</Form.Label>
                <Form.Control
                  className="bg-light"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "0.375rem",
                  }}
                  type="date"
                  value={currentGuest.checkInDate || ""}
                  onChange={(e) =>
                    handleInputChange("checkInDate", e.target.value)
                  }
                />
              </Form.Group>

              {/* Check-Out Date Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Check-Out Date</Form.Label>
                <Form.Control
                  className="bg-light"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "0.375rem",
                  }}
                  type="date"
                  value={currentGuest.checkOutDate || ""}
                  onChange={(e) =>
                    handleInputChange("checkOutDate", e.target.value)
                  }
                />
              </Form.Group>

              {/* Remaining Balance Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">
                  Remaining Balance (50%)
                </Form.Label>
                <Form.Control
                  className="bg-light"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "0.375rem",
                  }}
                  type="number"
                  value={currentGuest.balance || ""}
                  onChange={(e) => handleInputChange("balance", e.target.value)}
                />
              </Form.Group>

              {/* Room Price Field */}
              <Form.Group className="mb-3">
                <Form.Label className="fw-bold">Room Price</Form.Label>
                <Form.Control
                  className="bg-light text-dark"
                  style={{
                    border: "1px solid #ced4da",
                    borderRadius: "0.375rem",
                  }}
                  disabled
                  readOnly
                  value={currentGuest.roomPrice || ""}
                />
              </Form.Group>
            </Form>
          </Modal.Body>

          <Modal.Footer className="border-0">
            <div className="w-100 d-flex justify-content-end">
              {currentGuest.checkedIn ? (
                currentGuest.checkedOut ? (
                  <Button
                    variant="secondary"
                    onClick={() => setShowModal(false)}
                  >
                    Close
                  </Button>
                ) : (
                  <Button variant="success" onClick={saveCheckIn}>
                    Check Out
                  </Button>
                )
              ) : (
                <Button variant="warning" onClick={saveCheckIn}>
                  Check-In
                </Button>
              )}
            </div>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
}

export default Reservation;
