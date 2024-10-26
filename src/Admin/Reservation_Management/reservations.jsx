import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { Reservationss } from "./component/reservations";

import Table from "react-bootstrap/Table";
import { textDB } from "../../firebase";
import { Button, Modal, Form, Tabs, Tab } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faX } from "@fortawesome/free-solid-svg-icons";

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false); // State for confirmation modal
  const [showDeclineModal, setShowDeclineModal] = useState(false); // State for decline modal
  const [currentGuest, setCurrentGuest] = useState(null); // State for the current guest
  const [actionType, setActionType] = useState(""); // State for action type (check-in or check-out)
  const [value, setValue] = useState("");

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

  const handleInputChange = (field, value) => {
    setCurrentGuest((prev) => ({ ...prev, [field]: value }));
  };

  const handleShowConfirmModal = (type) => {
    setActionType(type);
    setShowConfirmModal(true);
  };

  const [isLoading, setIsLoading] = useState(false);
  const handleConfirm = async (pending) => {
    try {
      // Default values
      const room = {
        id: pending.id,
        roomname: pending.roomname || "Unknown Room",
        price: pending.roomPrice || 0,
      };
      const cottage = {
        id: pending.cottageId || "unknown-cottage-id",
        cottagename: pending.cottagename || "Unknown Cottage",
        price: pending.cottagePrice || 0,
      };

      const guests = pending.guests || { adults: 0, children: 0 };
      const checkInDate = pending.checkInDate || new Date().toISOString();
      const checkOutDate = pending.checkOutDate || new Date().toISOString();
      const specialCode = pending.specialCode || "";
      const guestDetails = pending.guestDetails || {};

      // Set loading state before the async operation
      setIsLoading(true);

      // Create reservation document
      const reservationSnapshot = await addDoc(
        collection(textDB, "guestData"),
        {
          roomId: room.id,
          roomname: room.roomname,
          guests,
          checkInDate,
          checkOutDate,
          specialCode,
          roomPrice: room.price,
          fiftyPercentPrice: room.price * 0.5,
          balance: room.price * 0.5,
          // availability: "Pending",
          cottageId: cottage.id,
          cottagename: cottage.cottagename,
          cottagePrice: cottage.price,
          cottageFiftyPercentPrice: cottage.price * 0.5,
          cottageBalance: cottage.price * 0.5,
          guestDetails,

        }
        
      );

      // Delete the specific pending document
      if (pending.id) {
        await deleteDoc(doc(textDB, "Peding", pending.id));
      }

      // Update state if input value is not empty
      if (value.trim() !== "") {
        const newItem = inputValue;
        if (newItem) {
          setPendings((prevData) => ({
            ...prevData,
            list: [...prevData.list, newItem],
          }));
        }
        console.log(reservationSnapshot);
        setValue("");
        setIsLoading(true)
      }

      console.log(reservationSnapshot);
    } catch (error) {
      console.error("Error confirming reservation:", error);
    } finally {
      // Reset loading state after operations
      setIsLoading(false);
    }
  };

  const handleShowDeclineModal = () => {
    setShowDeclineModal(true);
  };

  return (
    <main>
      <Tabs
        variant="pills"
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab className="text-dark" eventKey="home" title="Pending" size="sm">
          <Table striped>
            <thead>
              <tr>
                <th>#</th>
                <th>Guest</th>
                <th>Assets</th>
                <th>Price</th>
                <th>50% Paid</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {pendings.map((pending, index) => (
                <tr key={pending.id}>
                  <td>{index + 1}</td>
                  <td>
                    {pending.guestDetails.firstname}{" "}
                    {pending.guestDetails.lastname} {" || "}
                    <span className="text-muted">
                      {pending.guests.adults} Adults, {pending.guests.children}{" "}
                      Children
                    </span>
                  </td>
                  <td>
                    {pending.roomname} {pending.cottagename}
                  </td>
                  <td>
                    {pending.roomPrice} {pending.cottagePrice}
                  </td>
                  <td>{pending.fiftyPercentPrice}</td>
                  <td>
                    <div className="button-container">
                      <Button
                        size="sm"
                        variant="outline-success"
                        className="me-1"
                        onClick={() => handleConfirm(pending)}
                        isLoading={isLoading}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline-danger"
                        onClick={() => handleShowDeclineModal()}
                      >
                        <FontAwesomeIcon icon={faX} />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Tab>

        <Tab className="text-dark" eventKey="profile" title="Reservations">
          <Reservationss />
        </Tab>
      </Tabs>

      {/* Confirmation Modal */}
      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Body>
          Are you sure you want to{" "}
          {actionType === "checkIn" ? "check in" : "check out"} this guest?
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirm(pending)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Decline Modal */}
      <Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)}>
        {/* <Modal.Header closeButton>
          <Modal.Title>Decline Action</Modal.Title>
        </Modal.Header> */}
        <Modal.Body>Are you sure you want to decline this action?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowDeclineModal(false)}
          >
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => {
              // Add decline logic here
              console.log("Action declined!");
              handleConfirm(false);
            }}
          >
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </main>
  );
}

export default Reservations;
