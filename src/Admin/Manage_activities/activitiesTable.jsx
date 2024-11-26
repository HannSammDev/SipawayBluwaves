import React, { useState, useEffect } from 'react';
import { Table, Button, FormControl, Form } from 'react-bootstrap';

const BeachActivitiesTable = () => {
  const [activities, setActivities] = useState([]);

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
          <h6 className='fs-6'>Manage the Daily Activities</h6>
        </div>

        <div className="d-flex justify-content-between align-items-center pb-3">
          <Form.Control type='search'  placeholder='Search' className='w-25'/>
          <Button size="md" variant="dark">
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
        <Table responsive bordered hover>
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