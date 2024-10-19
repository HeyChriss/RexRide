import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the authentication context
import './RidesPage.css';
import rideImage from '../assets/rides.png';

const sampleRides = [
    {
      id: 1,
      from: 'Rexburg, ID',
      to: 'Salt Lake City, UT',
      seatsAvailable: 3,
      price: '$20',
      date: '2024-10-25',
      person: 'John Doe',
    },
    {
      id: 2,
      from: 'Idaho Falls, ID',
      to: 'Boise, ID',
      seatsAvailable: 2,
      price: '$35',
      date: '2024-10-26',
      person: 'Jane Smith',
    },
    {
      id: 3,
      from: 'Provo, UT',
      to: 'Las Vegas, NV',
      seatsAvailable: 1,
      price: '$50',
      date: '2024-10-27',
      person: 'Alex Johnson',
    },
];

const RidesPage = () => {
  const { isLoggedIn } = useAuth(); // Get the login status from the AuthContext
  const navigate = useNavigate();

  const handleReserve = (rideId) => {
    if (isLoggedIn) {
      navigate(`/reserve/${rideId}`);
    } else {
      navigate('/login');
    }
  };

  const handleCreateRide = () => {
    if (isLoggedIn) {
      navigate('/create-ride'); // Navigate to the CreateRidePage if the user is logged in
    } else {
      navigate('/login'); // Redirect to the login page if the user is not logged in
    }
  };

  return (
    <div className="rides-page">
      <div className="rides-list">
        <h2>Available Rides</h2>
        <button
          className="create-ride-button"
          onClick={handleCreateRide}
        >
          Create Ride
        </button>
        {sampleRides.map((ride) => (
          <div className="ride-card" key={ride.id}>
            <h3>{ride.from} → {ride.to}</h3>
            <p><strong>Seats Available:</strong> {ride.seatsAvailable}</p>
            <p><strong>Price:</strong> {ride.price}</p>
            <p><strong>Date:</strong> {ride.date}</p>
            <p><strong>Driver:</strong> {ride.person}</p>
            <button
              className="reserve-button"
              onClick={() => handleReserve(ride.id)}
            >
              Reserve a Spot
            </button>
          </div>
        ))}
      </div>
      <div className="rides-image">
        <img src={rideImage} alt="Ride" />
      </div>
    </div>
  );
};

export default RidesPage;