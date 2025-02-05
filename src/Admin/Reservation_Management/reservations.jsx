import {
  collection,
  getDocs,
  doc,
  updateDoc,
  addDoc,
  deleteDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

import { Reservationss } from './component/reservations';

import Table from 'react-bootstrap/Table';
import { textDB } from '../../firebase';
import { Button, Modal, Form, Tabs, Tab, Badge } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faX } from '@fortawesome/free-solid-svg-icons';

function Reservations() {
  const [reservations, setReservations] = useState([]);
  const [pendings, setPendings] = useState([]);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showDeclineModal, setShowDeclineModal] = useState(false);
  const [currentGuest, setCurrentGuest] = useState(null);
  const [actionType, setActionType] = useState('');
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPending, setSelectedPending] = useState(null); 
  // const [pendings, setPendings] = useState([]);

  const getReservation = async () => {
    const reservationsCollection = collection(textDB, 'guestData');
    const reservationSnapshot = await getDocs(reservationsCollection);
    const reservationList = reservationSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setReservations(reservationList);
  };

  const getPending = async () => {
    const pendingCollection = collection(textDB, 'Pending');
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

  const handleShowConfirmModal = (type, pending) => {
    setActionType(type);
    setCurrentGuest(pending);
    setShowConfirmModal(true);
  };

  const handleConfirm = async (pending) => {
    if (!pending) {
      console.error('No guest selected.');
      return;
    }

    setIsLoading(true);
    try {
      const room = {
        id: pending.id,
        roomname: pending.roomname || ' ',
        price: pending.roomPrice || 0,
      };
      const cottage = {
        id: pending.cottageId || 'unknown-cottage-id',
        cottagename: pending.cottagename || '',
        price: pending.cottagePrice || 0,
      };
      const guests = pending.guests || { adults: 0, children: 0 };
      const checkInDate = pending.checkInDate || new Date().toISOString();
      const checkOutDate = pending.checkOutDate || new Date().toISOString();
      const specialCode = pending.specialCode || '';
      const guestDetails = pending.guestDetails || {};

      await addDoc(collection(textDB, 'guestData'), {
        status: 'Not Available',
        // room
        roomId: room.id,
        roomname: room.roomname,
        guests,
        checkInDate,
        checkOutDate,
        specialCode,
        roomPrice: room.price,
        fiftyPercentPrice: room.price * 0.5,
        balance: room.price * 0.5,
        // Cottage
        cottageId: cottage.id,
        cottagename: cottage.cottagename,
        cottagePrice: cottage.price,
        cottageFiftyPercentPrice: cottage.price * 0.5,
        cottageBalance: cottage.price * 0.5,
        guestDetails,
      });

      if (pending.id) {
        await deleteDoc(doc(textDB, 'Pending', pending.id));
        setPendings((prevPendings) =>
          prevPendings.filter((item) => item.id !== pending.id),
        );
      }
    } catch (error) {
      console.error('Error confirming reservation:', error);
    } finally {
      setIsLoading(false);
    }
  };

 
  const handleDecline = async (pending) => {
    if (!pending) {
      console.error('No pending reservation selected.');
      return;
    }

    try {
      await deleteDoc(doc(textDB, 'reservations', pending.id));
      await deleteDoc(doc(textDB, 'Pending', pending.id)); 
      setPendings((prevPendings) =>
        prevPendings.filter((item) => item.id !== pending.id),
      ); 
    } catch (error) {
      console.error('Error deleting document:', error);
    }
  };

  // const handleDecline = async () => {
  //   const reservationCollection = collection(textDB, 'reservations');
  //   const pendingCollection = collection(textDB, 'Pending');
  
  //   // Example query to get documents (modify the query based on your criteria)
  //   const reservationQuerySnapshot = await getDocs(reservationCollection);
  //   const pendingQuerySnapshot = await getDocs(pendingCollection);
  
  //   // Loop through the query results and delete the documents
  //   reservationQuerySnapshot.forEach(async (docSnapshot) => {
  //     await deleteDoc(docSnapshot.ref);
  //   });
  
  //   pendingQuerySnapshot.forEach(async (docSnapshot) => {
  //     await deleteDoc(docSnapshot.ref);
  //   });
  // };
  
  


  
  const handleShowDeclineModal = (pending) => {
    setSelectedPending(pending); 
    setShowDeclineModal(true);
  };

  return (
    <main>
      <Tabs
        defaultActiveKey="home"
        transition={false}
        id="noanim-tab-example"
        className="mb-3"
      >
        <Tab
          className="text-dark"
          eventKey="home"
          title={
            <>
              Pending
              <Badge className="m-1" bg="danger">
                {pendings.length}
              </Badge>
            </>
          }
          size="sm"
        >
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
              {pendings.length > 0 ? (
                pendings.map((pending, index) => (
                  <tr key={pending.id}>
                    <td>{index + 1}</td>
                    <td>
                      {pending.guestDetails.firstname}{' '}
                      {pending.guestDetails.lastname} {' || '}
                      <span className="text-muted">
                        {pending.guests.adults} Adults,{' '}
                        {pending.guests.children} Children
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
                          onClick={() =>
                            handleShowConfirmModal('checkIn', pending)
                          }
                          disabled={isLoading}
                        >
                          <FontAwesomeIcon icon={faCheck} />
                        </Button>

                        <Button
                          size="sm"
                          variant="outline-danger"
                          onClick={() => handleShowDeclineModal(pending)}
                        >
                          <FontAwesomeIcon icon={faX} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" className="text-center bg-warning">
                    No Pending
                  </td>
                </tr>
              )}
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
          Are you sure you want to{' '}
          {actionType === 'checkIn' ? 'check in' : 'check out'} this guest?
          {currentGuest && (
            <div>
              {currentGuest.guestDetails.firstname}{' '}
              {currentGuest.guestDetails.lastname}
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowConfirmModal(false)}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={() => handleConfirm(currentGuest)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Decline Modal */}
      <Modal show={showDeclineModal} onHide={() => setShowDeclineModal(false)}>
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
              if (selectedPending) {
                handleDecline(selectedPending); 
              }
              setShowDeclineModal(false);
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
