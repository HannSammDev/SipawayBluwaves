import React from "react";
import { Form, Row, Col, Button } from "react-bootstrap";

export const AddCheckin = () => {
  return (
    <>
      <main>
        <Form>
          <Row className="mb-3">
            <Form.Group as={Col} md={6}>
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Enter your name" />
            </Form.Group>

            <Form.Group as={Col} md={6}>
              <Form.Label>Password</Form.Label>
              <Form.Control  placeholder="Lastname" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" controlId="formGridAddress1">
            <Form.Label>Address</Form.Label>
            <Form.Control type="text" placeholder="Enter your address" />
          </Form.Group>

          <Row className="mb-3">
            <Form.Group as={Col} md={6} controlId="formGridAdult">
              <Form.Label>Adults</Form.Label>
              <Form.Control type="number" placeholder="Number of adults" />
            </Form.Group>

            <Form.Group as={Col} md={6} controlId="formGridChildren">
              <Form.Label>Children</Form.Label>
              <Form.Control type="number" placeholder="Number of children" />
            </Form.Group>
          </Row>

          <Form.Group className="mb-3" id="formGridCheckbox">
            <Form.Check type="checkbox" label="Check me out" />
          </Form.Group>

          <Button variant="primary" type="submit">
            Add
          </Button>
        </Form>
      </main>
    </>
  );
};
