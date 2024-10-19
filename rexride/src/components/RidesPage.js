import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './AuthContext'; // Import the authentication context
import './RidesPage.css';
import rideImage from '../assets/rides.png';

const RidesPage = () => {
  const { isLoggedIn } = useAuth(); // Get the login status from the AuthContext
  const navigate = useNavigate();
  const [rides, setRides] = useState([]); // State to hold the fetched rides
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // State to show loading status

  useEffect(() => {
    // Fetch active rides from the API
    const fetchRides = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/get_active_rides', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          const data = await response.json();
          setRides(data); // Update the state with the fetched rides
          setError(null);
        } else {
          const errorData = await response.json();
          setError(errorData.message || 'Failed to fetch rides');
          setRides([]); // Clear rides if there's an error
        }
      } catch (err) {
        setError('An error occurred while fetching rides');
        console.error('Error:', err);
      } finally {
        setLoading(false); // Set loading to false after the request completes
      }
    };

    fetchRides();
  }, []); // Empty dependency array to run only once when the component mounts

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
        {loading ? (
          <p>Loading rides...</p>
        ) : error ? (
          <p className="error-message">{error}</p>
        ) : rides.length > 0 ? (
          rides.map((ride, index) => (
            <div className="ride-card" key={index}>
              <h3>{ride.from} → {ride.to}</h3>
              <p><strong>Seats Available:</strong> {ride.seats}</p>
              <p><strong>Price:</strong> {ride.price}</p>
              <p><strong>Date:</strong> {ride.date_and_time}</p>
              <p><strong>Driver:</strong> {ride.driver || 'Unknown'}</p>
              <button
                className="reserve-button"
                onClick={() => handleReserve(ride.id)}
              >
                Reserve a Spot
              </button>
            </div>
          ))
        ) : (
          <p>No active rides available</p>
        )}
      </div>
      <div className="rides-image">
        <img src={rideImage} alt="Ride" />
      </div>
    </div>
  );
};

export default RidesPage;