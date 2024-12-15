import { Button, ListGroupItem } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AddInventoy } from './inventoricomponent/addinventory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { collection, getDocs } from 'firebase/firestore';
import { textDB } from '../../firebase';
import { Key } from '@mui/icons-material';

export const ConsumableInventory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  // ------------------------------------
  const [inventories, setInventory] = useState([]);

  const fetchData = async () => {
    try {
      const ItemCollection = collection(textDB, 'inventory_Consumable');
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
        className="m-2 mt-2"
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
            <Button onClick={handleShow} variant="primary">
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
          <AddInventoy />
        </Modal>
        <ListGroup as="ol">
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            style={{
              backgroundColor: '#f8f9fa',
              fontWeight: 'bold',
              color: '#495057',
            }}
          >
            <div className="ms-2 row me-auto">
              <div className="col-1 me-5">#</div>
              <div className="col-1 w-10">Item</div>
            </div>
            <div className="d-flex justify-content-between">
              <div>Quantity</div>
            </div>
          </ListGroup.Item>

          {inventories.length ? (
            inventories.map((inventory, index) => (
              <ListGroup.Item
                Key={inventory.id}
                as="li"
                className="d-flex justify-content-between align-items-start"
              >
                <div className="ms-2 row me-auto">
                  <div className="col-1 me-5">{index + 1}</div>
                  <div className="fw-bold col-1">{inventory.item_name}</div>
                </div>
                <div className="d-flex justify-content-between">
                  <Badge bg="primary" pill>
                    {inventory.quantity}
                  </Badge>
                </div>
              </ListGroup.Item>
            ))
          ) : (
            <ListGroup.Item className="text-center bg-warning">
              <span>No Inventory Found</span>
            </ListGroup.Item>
          )}
        </ListGroup>
      </div>
    </>
  );
};
