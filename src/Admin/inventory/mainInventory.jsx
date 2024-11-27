import React, { useState } from 'react';
import { Tabs, Tab } from 'react-bootstrap';
import { ConsumableInventory } from './consumable';
import { NotConsumable } from './notConsumbale';
// import { NotConsumableInventory } from './notConsumablePage';

export const InventoryMainPage = () => {
  const [key, setKey] = useState('consumable');

  return (
    <>
      <div>
        <div className=" ms-4 mt-4 d-flex flex-column">
          <span className="fs-4">
            <b>Inventory Overview</b>
          </span>
          <span>Monitor and manage inventory</span>
        </div>
        <Tabs
          defaultActiveKey="consumable"
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="consumable" title="Consumable">
            <ConsumableInventory />
          </Tab>
          <Tab eventKey="notconsumable" title="Not Consumable">
            {/* <NotConsumableInventory /> */}
            <NotConsumable />
          </Tab>
        </Tabs>
      </div>
    </>
  );
};
