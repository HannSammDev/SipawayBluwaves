import React from 'react';

const ReservationConfirmation = ({ prevStep }) => {
  return (
    <div className="step-container">
      <h2>Reservation Confirmation</h2>
      <p>Your reservation has been confirmed!</p>
      <p>Please log in or sign up to view the details.</p>
      <div className="step-buttons">
        <button onClick={prevStep}>Back</button>
        <a href="/login">Login</a> | <a href="/signup">Sign Up</a>
      </div>
    </div>
  );
};

export default ReservationConfirmation;
