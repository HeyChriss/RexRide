import React, { useState } from 'react';
import './CreateRidePage.css';
import rideImage from '../assets/create-ride.png'; // Replace with the actual image path

const CreateRidePage = () => {
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate ride creation (this could be replaced with an API call)
    console.log('Ride Created:', formData);
    setIsSubmitted(true);
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