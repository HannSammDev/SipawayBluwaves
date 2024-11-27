import { Button } from 'react-bootstrap';
import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { AddInventoy } from './inventoricomponent/addinventory';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

export const ConsumableInventory = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="m-2 mt-2">
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
        <ListGroup as="ol" >
          {/* Simulated Header */}
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            style={{
              backgroundColor: '#f8f9fa',
              fontWeight: 'bold',
              color: '#495057',
            }}
          >
            <div className="ms-2 me-auto">
              <div>Item Name</div>
            </div>
            <div className="d-flex justify-content-between">
             
              <div>Quantity</div>
            </div>
          </ListGroup.Item>

          {/* Actual List Items */}
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sabon</div>
            </div>
            <div className="d-flex justify-content-between">
             
              <Badge bg="primary" pill>
                14
              </Badge>
            </div>
          </ListGroup.Item>

          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Shampoo</div>
            </div>
            <div className="d-flex justify-content-between">
              
              <Badge bg="primary" pill>
                14
              </Badge>
            </div>
          </ListGroup.Item>

          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Towel</div>
            </div>
            <div className="d-flex justify-content-between">
             
              <Badge bg="primary" pill>
                14
              </Badge>
            </div>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};
