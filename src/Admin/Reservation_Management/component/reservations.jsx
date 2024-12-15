import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import Table from 'react-bootstrap/Table';
import { textDB } from '../../../firebase';
import { Button, Modal, Form, Pagination, Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Dropdown from 'react-bootstrap/Dropdown';
import { AddCheckin } from './addCheckin';

export const Reservationss = () => {
  const [reservations, setReservations] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(null);
  const [actionType, setActionType] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const guestsPerPage = 5;
  const [lgShow, setLgShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const getReservation = async () => {
    try {
      const reservationsCollection = collection(textDB, 'guestData');
      const reservationSnapshot = await getDocs(reservationsCollection);
      const reservationList = reservationSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setReservations(reservationList);
      console.log('Fetched reservations: ', reservationList);
    } catch (error) {
      console.error('Error fetching reservations: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getReservation();
  }, []);

  const handleShowModal = (guest) => {
    if (guest) {
      setCurrentGuest(guest);
      setShowModal(true);
    } else {
      console.error('Guest is not defined');
    }
  };

  const handleShowConfirmModal = (action, guest) => {
    setActionType(action);
    setCurrentGuest(guest);
    setShowConfirmModal(true);
  };

  const handleInputChange = (field, value) => {
    setCurrentGuest((prev) => ({ ...prev, [field]: value }));
  };

  const handleAction = async () => {
    if (!currentGuest) {
      console.error('No guest selected.');
      return;
    }

    const guestRef = doc(textDB, 'guestData', currentGuest.id);
    try {
      if (actionType === 'checkIn') {
        await updateDoc(guestRef, {
          checkedIn: true,
          checkInDate: new Date().toISOString().split('T')[0],
          checkedOut: false,
        });

        await addDoc(collection(textDB, 'reservations'), {
          guestId: currentGuest.id,
          status: 'Not Available',
          roomname: currentGuest.roomname,
          checkInDate: new Date().toISOString().split('T')[0],
        });
      } else if (actionType === 'checkOut') {
        await updateDoc(guestRef, {
          checkedOut: true,
          checkOutDate: new Date().toISOString().split('T')[0],
        });
      }
      getReservation();
      setShowConfirmModal(false);
      setShowModal(false);
    } catch (error) {
      console.error('Error updating reservation: ', error);
    }
  };

  const filteredGuests = reservations.filter((guest) =>
    guest.guestDetails?.firstname
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase()),
  );

  const indexOfLastGuest = currentPage * guestsPerPage;
  const indexOfFirstGuest = indexOfLastGuest - guestsPerPage;
  const currentGuests = filteredGuests.slice(
    indexOfFirstGuest,
    indexOfLastGuest,
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
      </Pagination.Item>,
    );
  }

  return (
    <div>
      <div
        className="d-flex justify-content-between mb-4"
        style={{
          borderRadius: '10px',
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          padding: '8px',
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
        <Modal.Header closeButton></Modal.Header>
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
          {isLoading ? (
            <tr>
              <td colSpan="6" className="text-center">
                <div className="d-flex justify-content-center align-items-center">
                  <Spinner animation="border" role="status" />
                  <span className="ms-2">Loading...</span>
                </div>
              </td>
            </tr>
          ) : currentGuests.length > 0 ? (
            currentGuests.map((reservation, index) => (
              <tr key={reservation.id}>
                <td>{index + 1}</td>
                <td>
                  {reservation.roomname} {reservation.cottagename}
                </td>
                <td>{`${reservation.guestDetails?.firstname || ''} ${
                  reservation.guestDetails?.lastname || ''
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
                </td>
                <td>
                  <div className="d-flex align-items-center">
                    <Button
                      size="sm"
                      onClick={() => handleShowModal(reservation)}
                      variant="primary"
                      className="me-2"
                    >
                      View
                    </Button>
                    {!reservation.checkedIn && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleShowConfirmModal('checkIn', reservation)
                        }
                        variant="success"
                        className="me-2 text-white"
                      >
                        Checkin
                        {/* <FontAwesomeIcon
                          icon={faCheckCircle}
                          className="me-0 text-white"
                        /> */}
                      </Button>
                    )}

                    {!reservation.checkedOut && (
                      <Button
                        size="sm"
                        onClick={() =>
                          handleShowConfirmModal('checkOut', reservation)
                        }
                        variant="warning"
                        className="me-2"
                      >
                        Checkout
                        {/* <FontAwesomeIcon
                          icon={faSignOutAlt}
                          className="me-0 text-success"
                        /> */}
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center bg-warning">
                No Reservation Confirmed
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      <Pagination className="d-flex justify-content-center">
        {paginationItems}
      </Pagination>

      <Modal show={showConfirmModal} onHide={() => setShowConfirmModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {actionType === 'checkIn'
              ? 'Confirm Check-In'
              : 'Confirm Check-Out'}
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
        <Modal.Header closeButton className="bg-primary">
          <Modal.Title className="text-white">Guest Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentGuest && (
            <div className="container">
              {/* <div className="row mb-2">
                <div className="col-6">
                  <strong>Name: </strong>
                  {`${currentGuest.guestDetails?.firstname} ${currentGuest.guestDetails?.lastname}`}
                </div>
                
                 

              </div> */}
              <div className="row mb-2">
                <div className="col-6">
                  <strong>Guests:</strong>
                </div>
                <div className="col-6 text-end text-muted">
                  {currentGuest.guests.adults} Adults,{' '}
                  {currentGuest.guests.children} Children
                </div>
              </div>
              {/* <div className="row mb-2">
                <div className="col-6">
                  <strong>Asset:</strong>
                </div>
                <div className="col-6 text-end">{currentGuest.roomname}</div>
              </div> */}
              <div className="row mb-2">
                <div className="col-6">
                  <strong>Price:</strong>
                </div>
                <div className="col-6 text-end">₱{currentGuest.roomPrice}</div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <strong>Paid Amount (50%):</strong>
                </div>
                <div className="col-6 text-end">
                  ₱{currentGuest.fiftyPercentPrice.toFixed(2)}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <strong>Balance:</strong>
                </div>
                <div className="col-6 text-end">
                  ₱{currentGuest.balance.toFixed(2)}
                </div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <strong>Check-In Date:</strong>
                </div>
                <div className="col-6 text-end">{currentGuest.checkInDate}</div>
              </div>
              <div className="row mb-2">
                <div className="col-6">
                  <strong>Check-Out Date:</strong>
                </div>
                <div className="col-6 text-end">
                  {currentGuest.checkOutDate}
                </div>
              </div>
            </div>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};
