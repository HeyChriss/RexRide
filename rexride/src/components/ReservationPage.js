import React from 'react';
import { useParams } from 'react-router-dom';

const ReservationPage = () => {
  const { rideId } = useParams(); // Get the ride ID from the URL

  return (
    <div className="reservation-page">
      <h2>Reservation Page</h2>
      <p>You are reserving a spot for ride ID: {rideId}</p>
      <p>Please fill in your details to confirm the reservation.</p>
      {/* Add form fields here for the reservation details */}
    </div>
  );
};

export default ReservationPage;