import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MultiStepToggle.css';
import rexburg from '../assets/rexburg.png';
import utah from '../assets/utah.png';
import other from '../assets/other.png';
import needs from '../assets/needs.png';
import gives from '../assets/gives.png';
import provo from '../assets/provo.png';
import saltLakeCity from '../assets/saltlakecity.png';
import boise from '../assets/boise.png';
import walmartShuttle from '../assets/walmartshuttle.png';

const MultiStepToggle = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [location, setLocation] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const nextStep = () => {
    if (currentStep === 3) {
      navigate('/create-account'); // Redirect to CreateAccount after step 3
    } else {
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
    if (currentStep === 3) {
      navigate('/create-account'); // Redirect to CreateAccount immediately after selecting a card on step 3
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
                <img src={rexburg} alt="Rexburg" className="car-image" />
                <p>Rexburg</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Utah')}>
                <img src={utah} alt="Utah" className="car-image" />
                <p>Utah</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Other')}>
                <img src={other} alt="Other" className="car-image" />
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
        return (
          <div className="step-content">
            <h2>Select Your Destination</h2>
            <div className="location-buttons">
              <div className="card" onClick={() => handleLocationChange('Rexburg')}>
                <img src={rexburg} alt="Rexburg" className="car-image" />
                <p>Rexburg</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Provo')}>
                <img src={provo} alt="Provo" className="car-image" />
                <p>Provo</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Salt Lake City')}>
                <img src={saltLakeCity} alt="Salt Lake City" className="car-image" />
                <p>Salt Lake City</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Boise')}>
                <img src={boise} alt="Boise" className="car-image" />
                <p>Boise</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Walmart Shuttle')}>
                <img src={walmartShuttle} alt="Walmart Shuttle" className="car-image" />
                <p>Walmart Shuttle in Rexburg</p>
              </div>
              <div className="card" onClick={() => handleLocationChange('Other')}>
                <img src={other} alt="Other" className="car-image" />
                <p>Other</p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="multi-step-toggle">
      <div>{renderStepContent()}</div>
      <div className="navigation-buttons">
        {currentStep > 1 && <button onClick={prevStep}>Previous</button>}
        {currentStep <= 3 && <button onClick={nextStep}>Next</button>}
      </div>
    </div>
  );
};

export default MultiStepToggle;