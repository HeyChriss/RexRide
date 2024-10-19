import React, { useState } from 'react';
import './ReportPage.css'; // Create a CSS file for styling if needed

const ReportPage = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle the form submission logic here (e.g., send data to the backend)
    setIsSubmitted(true); // Show the success message
    setName(''); // Clear the form fields
    setDescription('');
  };

  return (
    <div className="report-page">
      <h2>Report an Issue</h2>
      {isSubmitted ? (
        <p className="success-message">Your report has been successfully submitted!</p>
      ) : (
        <form onSubmit={handleSubmit} className="report-form">
          <div className="input-group">
            <label htmlFor="name">Name of the person to report:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <label htmlFor="description">Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      )}
    </div>
  );
};

export default ReportPage;