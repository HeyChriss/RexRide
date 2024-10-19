import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const ReservationPage = () => {
  const { rideId } = useParams(); // Get the ride ID from the URL
  const [confirmationNumber, setConfirmationNumber] = useState(null);

  useEffect(() => {
    // Generate a random confirmation number between 100000 and 999999
    const randomConfirmationNumber = Math.floor(100000 + Math.random() * 900000);
    setConfirmationNumber(randomConfirmationNumber);
  }, []);

  return (
    <div className="reservation-page">
      <h2>Reservation Confirmation</h2>
      <p>Confirmation Number: <strong>{confirmationNumber}</strong></p>
      {/* Add form fields here for the reservation details */}
    </div>
  );
};

export default ReservationPage;