import React, { useState, useEffect } from "react";
import { Table, Button } from "react-bootstrap";

const BeachActivitiesTable = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    // Simulate fetching data from an API
    const fetchActivities = async () => {
      // Example static data, replace with your API call if needed
      const data = [
        { title: "Beach Volleyball", description: "Join a game of volleyball on the beach.", time: "2024-11-26T10:00:00" },
        { title: "Snorkeling", description: "Explore the underwater world with snorkeling gear.", time: "2024-11-26T13:00:00" },
        { title: "Sunset Yoga", description: "Relax and unwind with a sunset yoga session.", time: "2024-11-26T17:00:00" }
      ];
      setActivities(data);
    };

    fetchActivities();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Beach Activities</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Time</th>
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, index) => (
            <tr key={index}>
              <td>{activity.title}</td>
              <td>{activity.description}</td>
              <td>{new Date(activity.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant="primary">Add Activity</Button>
    </div>
  );
};

export default BeachActivitiesTable;
