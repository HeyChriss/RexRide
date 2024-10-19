import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MultiStepToggle.css';
import rexburg from '../assets/rexburg.png';
import utah from '../assets/utah.png';
import other from '../assets/other.png';
import needs from '../assets/needs.png';
import gives from '../assets/gives.png';

const MultiStepToggle = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const nextStep = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleLocationChange = (value) => {
    setLocation(value);
    if (value === 'Giving a ride') {
      navigate('/login'); // Redirect to the login page
    } else {
      nextStep();
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Where are you located?</h2>
            <div className="location-buttons">
              <div className="card" onClick={() => handleLocationChange('Rexburg')}>
                <img src={rexburg} alt="Car 1" className="car-image" />
                <p>Rexburg</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Utah')}>
                <img src={utah} alt="Car 2" className="car-image" />
                <p>Utah</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Other')}>
                <img src={other} alt="Car 3" className="car-image" />
                <p>Other</p>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h2>What would you like to do?</h2>
            <div className="location-buttons">
              <div className="card" onClick={() => handleLocationChange('Need a ride')}>
                <img src={needs} alt="Need a ride" className="car-image" />
                <p>Need a ride</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Giving a ride')}>
                <img src={gives} alt="Giving a ride" className="car-image" />
                <p>Giving a ride</p>
              </div>
            </div>
          </div>
        );
      case 3:
        return <div className="step-content"><h2>Step 3: Content goes here</h2></div>;
      case 4:
        return <div className="step-content"><h2>Step 4: Content goes here</h2></div>;
      case 5:
        return <div className="step-content"><h2>Step 5: Content goes here</h2></div>;
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-toggle">
      <div>{renderStepContent()}</div>
      <div className="navigation-buttons">
        {currentStep > 1 && <button onClick={prevStep}>Previous</button>}
        {currentStep < 5 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default MultiStepToggle;