import { useState } from "react";
import { FormControl, Modal, Button } from "react-bootstrap";
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
        <FormControl
          value={inventory}
          name="Inventory"
          onChange={(e) => setInventory(e.target.value)}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleSubmit} variant="primary">
          Submit
        </Button>
      </Modal.Footer>
    </>
  );
};
