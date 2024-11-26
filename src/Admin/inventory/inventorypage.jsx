import { Button } from "react-bootstrap";
import Badge from "react-bootstrap/Badge";
import ListGroup from "react-bootstrap/ListGroup";
import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { AddInventoy } from "./inventoricomponent/addinventory";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export const InventoryPage = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <div className="m-2 mt-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="mb-4 d-flex flex-column">
            <span className="fs-4">
              <b>Inventory Overview</b>
            </span>
            <span>Monitor and manage inventory</span>
          </div>
          <div className="me-2">
            <Button onClick={handleShow} variant="dark">
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
        <ListGroup as="ol" numbered>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Sabon</div>
              {/* Cras justo odio */}
            </div>
            <Badge bg="primary" pill>
              14
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Shampoo</div>
              {/* Cras justo odio */}
            </div>
            <Badge bg="primary" pill>
              14
            </Badge>
          </ListGroup.Item>
          <ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">Towel</div>
              {/* Cras justo odio */}
            </div>
            <Badge bg="primary" pill>
              14
            </Badge>
          </ListGroup.Item>
        </ListGroup>
      </div>
    </>
  );
};
