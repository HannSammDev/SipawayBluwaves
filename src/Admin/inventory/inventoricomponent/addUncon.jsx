import React, {useState} from 'react';
import { Modal,FloatingLabel,Form, Button } from 'react-bootstrap';
import { collection , addDoc} from 'firebase/firestore';
import { textDB } from '../../../firebase';

export const AddUnConsummable = () => {
  const [inventoryData, setInventoryData] = useState({
    item_name: '',
    quantity: 1,
    location: '',
  });

  const handleSubmit = async () => {
    try {
      const inventoryRef = collection(textDB, 'inventory_Unconsumable');

      const response = await addDoc(inventoryRef, {
        item_name: inventoryData.item_name,
        quantity: Number(inventoryData.quantity),
        location: inventoryData.location,
      });

      const addedData = {
        ...inventoryData,

        id: response.id,
      }
      setInventoryData(addedData);


      console.log(addedData, 'Added Succesfully');

      setInventoryData({
        item_name: ' ',
        quantity: 1,
        location: ' ',
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
        <FloatingLabel className='mb-3' controlId="floatingPassword" label="Quantity">
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
        <FloatingLabel className='mb-3' controlId="floatingPassword" label="Location">
          <Form.Control
            size="sm"
            type="text"
            value={inventoryData.location}
            placeholder="Location"
            onChange={(e) =>
              setInventoryData((prevData) => ({
                ...prevData,
                location: e.target.value,
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
