import React from 'react';
import { Table } from 'react-bootstrap';

export const NotConsumable = () => {
  return (
    <>

        
      <div className='m-2'
        style={{
          boxShadow: '0px 0px 10px 5px rgba(0, 0, 0, 0.1)',
          padding: '1em',
          borderRadius: '10px',
        }}
      >
        <Table responsive striped hover size="sm">
          <thead>
            <tr>
              <th>#</th>
              <th>Item</th>
              <th>Quantity</th>
              <th>Location</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>BED</td>
              <td>2</td>
              <td>Room 1</td>
            </tr>
            <tr>
              <td>2</td>
              <td>Chaire</td>
              <td>3</td>
              <td>ROOm 2</td>
            </tr>
            <tr>
             
            </tr>
          </tbody>
        </Table>
      </div>
    </>
  );
};
