import { TuneRounded } from '@mui/icons-material';
import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  // FormControl,
  Form,
  Modal,
  Image,
  // ModalHeader,
  // ModalBody,
  // ModalFooter,
  // ModalTitle,
} from 'react-bootstrap';
import AdminActivityForm from './AddActivity';
import { collection, getDocs } from 'firebase/firestore';
import { textDB } from '../../firebase';

const BeachActivitiesTable = () => {
  const [activities, setActivities] = useState([]);
  const [show, setShow] = useState(false);

  useEffect(() => {



    fetchActivities();
  }, []);
  const fetchActivities = async () => {
    try {
      const activityCollection = collection(textDB, 'activity');
      const snapshot = await getDocs(activityCollection);


      const activityList = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));

      console.log(activityList, 'success');
      setActivities(activityList);
    } catch (error) {
      console.error("Error fetching activities: ", error);
    }
  };
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
            <AdminActivityForm />
          </Modal.Body>
          {/* <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary">Submit</Button>
          </Modal.Footer> */}
        </Modal>
        <Table responsive striped hover>
          <thead>
            <tr>
            <th>#</th>
              <th>Activity</th>
              <th>Image</th>
              <th>Description</th>
              {/* <th>Time</th> */}
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr key={index} className='justify-content-between'>
                <td>{index + 1}.</td>
                <td>{activity.activityName}</td>
                <td><Image className='' style={{width:'15%'}} src={activity.images}/></td>
                <td>{activity.writeAnything}</td>
                {/* <td>
                  {new Date(activity.time).toLocaleTimeString([], {
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </td> */}
                <td className=''>
                <div className="d-flex align-items-center">
                  <Button className='me-1' variant='danger' size='sm'>Delete</Button>
                  <Button variant='warning' size='sm'>Edit</Button>
                  </div>
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
