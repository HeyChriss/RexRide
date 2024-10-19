import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import RidesPage from './components/RidesPage';
import LoginPage from './components/LoginPage';
import CreateAccount from './components/CreateAccount';
import AboutUs from './components/AboutUs';
import ReportPage from './components/ReportPage';
import ReservationPage from './components/ReservationPage';
import CreateRidePage from './components/CreateRidePage'; // Import CreateRidePage
import AccountPage from './components/AccountPage';
import MultiStepToggle from './components/MultiStepToggle';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/rides" element={<RidesPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/create-account" element={<CreateAccount />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/report" element={<ReportPage />} />
            <Route path="/reserve/:rideId" element={<ReservationPage />} />
            <Route path="/create-ride" element={<CreateRidePage />} /> {/* Create Ride route */}
            <Route path="/account" element={<AccountPage />} />
            <Route path="/multistep-toggle" element={<MultiStepToggle  />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;