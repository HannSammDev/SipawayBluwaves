import { TuneRounded } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  FormControl,
  Form,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalTitle,
} from 'react-bootstrap';

const BeachActivitiesTable = () => {
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchActivities = async () => {
      // Example static data, replace with your API call if needed
      const data = [
        {
          title: 'Beach Volleyball',
          description: 'Join a game of volleyball on the beach.',
          time: '2024-11-26T10:00:00',
        },
        {
          title: 'Snorkeling',
          description: 'Explore the underwater world with snorkeling gear.',
          time: '2024-11-26T13:00:00',
        },
        {
          title: 'Sunset Yoga',
          description: 'Relax and unwind with a sunset yoga session.',
          time: '2024-11-26T17:00:00',
        },
      ];
      setActivities(data);
    };

    fetchActivities();
  }, []);

  const handleShow = () => setShow(true);

  const handleClose = () => setShow(false);

  return (
    <div className="container mt-4">
      <div
        className="mb-3"
        style={{
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          padding: '1em',
          borderRadius: '10px',
        }}
      >
        <div className=" justify-content-start mb-3">
          <h5 className="mb-1 fs-4 bold">Beach Activities</h5>
          <h6 className="fs-6">Manage the Daily Activities</h6>
        </div>

        <div className="d-flex justify-content-between align-items-center pb-3">
          <Form.Control type="search" placeholder="Search" className="w-25" />
          <Button variant="primary" onClick={handleShow}>
            Add Activity
          </Button>
        </div>
      </div>
      <div
        style={{
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          padding: '1em',
          borderRadius: '10px',
        }}
      >
        <Modal show={show} onHide={handleClose}>
          <Modal.Header className='bg-primary' closeButton>
            <Modal.Title className='fs-5 text-white'>Add Activities</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>Insert your activity details here.</p>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Submit</Button>
          </Modal.Footer>
        </Modal>
        <Table responsive striped hover>
          <thead>
            <tr>
              <th>Activity</th>
              <th>Image</th>
              <th>Description</th>

              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index}>
                <td>{activity.title}</td>
                <td></td>
                <td>{activity.description}</td>
                <td>
                  {new Date(activity.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default BeachActivitiesTable;
