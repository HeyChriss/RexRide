import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Home.css';
import heroImage from '../assets/hero.png'; // Replace this with the actual image path

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="hero-section" style={{ backgroundImage: `url(${heroImage})` }}>
        <div className="overlay">
          <div className="text-content">
            <h1>Rex Ride</h1>
            <p>
            Tired of searching for rides on Facebook? Concerned about your safety?
            RexRide has you covered! Our platform makes it easy for students and the
            community to find trusted carpool options and reliable rides.
            With RexRide, you can enjoy a safer, more convenient way to connect with drivers and passengers.
            </p>
            <div className="home-buttons">
              <button onClick={() => navigate('/login')} className="home-button">
                Log In
              </button>
              <button onClick={() => navigate('/create-account')} className="home-button">
                Create Account
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;