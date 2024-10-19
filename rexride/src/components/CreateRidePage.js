import React, { useState } from 'react';
import './CreateRidePage.css';
import rideImage from '../assets/create-ride.png'; 
import { useAuth } from './AuthContext'; // Import the AuthContext

const CreateRidePage = () => {
  const { userName } = useAuth(); // Get the user's name from AuthContext
  const [formData, setFormData] = useState({
    vehicle: '',
    from: '',
    to: '',
    plateNumber: '',
    price: '',
    seatsAvailable: '',
    date: '',
    pickupPlace: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isLoading) return; 
    setIsLoading(true);

    const payload = {
      plate: formData.plateNumber,
      seats: formData.seatsAvailable,
      pickup: formData.pickupPlace,
      destination: formData.to,
      price: formData.price,
      from: formData.from,
      to: formData.to,
      date_and_time: formData.date,
      status: true,
      vehicle: formData.vehicle,
      driver: userName, // Include the driver's name
    };

    try {
      const response = await fetch('http://localhost:5000/api/add_ride', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setIsSubmitted(true);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to create ride');
      }
    } catch (error) {
      setError('An error occurred while creating the ride');
      console.error('Error:', error);
    } finally {
      setIsLoading(false); 
    }
  };

  return (
    <div className="create-ride-page">
      {isSubmitted ? (
        <div className="success-message">
          <h2>Ride Created Successfully!</h2>
          <p>Your ride has been successfully created.</p>
        </div>
      ) : (
        <>
          <div className="create-ride-image">
            <img src={rideImage} alt="Create Ride" />
          </div>
          <div className="create-ride-form">
            <h2>Create a New Ride</h2>
            {error && <p className="error-message">{error}</p>}
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="vehicle">Vehicle:</label>
                <input
                  type="text"
                  id="vehicle"
                  name="vehicle"
                  value={formData.vehicle}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="from">From:</label>
                <input
                  type="text"
                  id="from"
                  name="from"
                  value={formData.from}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="to">To:</label>
                <input
                  type="text"
                  id="to"
                  name="to"
                  value={formData.to}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="plateNumber">Plate Number:</label>
                <input
                  type="text"
                  id="plateNumber"
                  name="plateNumber"
                  value={formData.plateNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="price">Price:</label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="seatsAvailable">Seats Available:</label>
                <input
                  type="number"
                  id="seatsAvailable"
                  name="seatsAvailable"
                  value={formData.seatsAvailable}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Date:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={formData.date}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="pickupPlace">Pick-up Place:</label>
                <input
                  type="text"
                  id="pickupPlace"
                  name="pickupPlace"
                  value={formData.pickupPlace}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="create-ride-button">Create Ride</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default CreateRidePage;