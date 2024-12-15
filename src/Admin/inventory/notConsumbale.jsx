import { faEye, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useState, useEffect } from 'react';
import { Badge, Button, Table, Modal } from 'react-bootstrap';
import { AddUnConsummable } from './inventoricomponent/addUncon';
import { collection, getDocs } from 'firebase/firestore';
import { textDB } from '../../firebase';

export const NotConsumable = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [inventories, setInventory] = useState([]);

  const fetchData = async () => {
    try {
      const ItemCollection = collection(textDB, 'inventory_Unconsumable');
      const response = await getDocs(ItemCollection);
      const data = response.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setInventory(data);
      console.log('Success ', data);
    } catch (error) {
      console.log(error, 'Field to get Data');
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div
        className="m-2"
        style={{
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          padding: '1em',
          borderRadius: '10px',
        }}
      >
        <div className="d-flex justify-content-end align-items-center">
          {/* <div className="mb-4 d-flex flex-column">
            <span className="fs-4">
              <b>Inventory Overview</b>
            </span>
            <span>Monitor and manage inventory</span>
          </div> */}
          <div className="m-2">
            <Button variant="primary"  onClick={handleShow}>
              <FontAwesomeIcon icon={faPlus} /> Item
            </Button>
          </div>
        </div>
        <Modal
          show={show}
          onHide={handleClose}
          backdrop="static"
          keyboard={false}
        >
          <AddUnConsummable />
        </Modal>
        <Table responsive striped hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Location</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {inventories.length ? (
              inventories.map((inventory, index) => (
                <tr key={inventory.id}>
                  <td>{index + 1}</td>
                  <td>{inventory.item_name}</td>
                  <td>
                    <Badge>{inventory.quantity}</Badge>
                  </td>
                  <td>{inventory.location}</td>
                  <td>
                    <Button variant="transparent">
                      <FontAwesomeIcon icon={faEye} />
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5" className='text-center bg-warning'>No inventories available</td>{' '}
              </tr>
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
};
