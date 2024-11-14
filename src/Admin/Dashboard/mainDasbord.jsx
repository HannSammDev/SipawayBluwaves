import { useState } from 'react';
import{Tab,Tabs}  from 'react-bootstrap';

import { Dashboard } from './dashborad';
import ReservationCalendar from './components/calendar';

export const MainDashbord = () => {
  const [key, setKey] = useState('home');

  return (
    <Tabs
      variant='pills'
      
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3 "
    >
      <Tab eventKey="home" title="Overview"  >
       <Dashboard/>
      </Tab>
      <Tab eventKey="profile" title="Calendar">
       <ReservationCalendar/>
      </Tab>
      <Tab eventKey="contact" title="Contact" disabled>
        Tab content for Contact
      </Tab>
    </Tabs>
  );
}

