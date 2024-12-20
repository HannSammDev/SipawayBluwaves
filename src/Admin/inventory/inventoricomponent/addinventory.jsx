import { useState } from 'react';
import { Form, Modal, Button, FloatingLabel } from 'react-bootstrap';
import { textDB } from '../../../firebase';
import { addDoc, collection } from 'firebase/firestore';

export const AddInventoy = () => {
  const [inventoryData, setInventoryData] = useState({
    item_name: '',
    quantity: 1,
  });

  const handleSubmit = async () => {
    try {
      const inventoryRef = collection(textDB, 'inventory_Consumable');

      const response = await addDoc(inventoryRef, {
        item_name: inventoryData.item_name,
        quantity: Number(inventoryData.quantity),
      });
      setInventoryData(response.data)
      console.log(response.data,'Added Succesfully');
      setInventoryData({
        item_name: ' ',
        quantity: 1,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Modal.Header closeButton className="bg-primary">
        <Modal.Title className="fs-5  text-white">Add Inventory</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <FloatingLabel
          controlId="floatingInput"
          label="Add Item"
          className="mb-3"
        >
          <Form.Control
            size="sm"
            value={inventoryData.item_name}
            placeholder="Item"
            onChange={(e) =>
              setInventoryData((prevData) => ({
                ...prevData,
                item_name: e.target.value,
              }))
            }
          />
        </FloatingLabel>
        <FloatingLabel controlId="floatingPassword" label="Quantity">
          <Form.Control
            size="sm"
            type="number"
            value={inventoryData.quantity}
            placeholder="Quantity"
            onChange={(e) =>
              setInventoryData((prevData) => ({
                ...prevData,
                quantity: e.target.value,
              }))
            }
          />
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
