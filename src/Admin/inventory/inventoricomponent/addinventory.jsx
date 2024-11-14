import { useState } from "react";
import { Form, Modal, Button, FloatingLabel } from "react-bootstrap";
import { textDB } from "../../../firebase";
import { addDoc, collection } from "firebase/firestore";

export const AddInventoy = () => {
  const [inventory, setInventory] = useState("");

  const handleSubmit = async () => {
    try {
      // Get a reference to the 'inventory' collection
      const inventoryRef = collection(textDB, "inventory");

      // Add a new document to the collection with the inventory data
      const response = await addDoc(inventoryRef, {
        inventory: inventory,
      });
      console.log(response);
      setInventory(""); // Reset inventory after successful submission
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton>
        <Modal.Title className="fs-5">Add Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Add Item"
          className="mb-3"
        >
          <Form.Control size="sm" type="email" placeholder="Item" />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Quantity">
          <Form.Control size="sm" type="number" placeholder="Quantity" />
        </FloatingLabel>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};
