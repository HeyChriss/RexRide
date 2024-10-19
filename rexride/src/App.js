import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import Home from './components/Home';
import MultiStepToggle from './components/MultiStepToggle';
import LoginPage from './components/LoginPage';
import CreateAccount from './components/CreateAccount';
import AboutUs from './components/AboutUs';
import ReportPage from './components/ReportPage';
import AccountPage from './components/AccountPage'; // Import AccountPage component

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/rides" element={<MultiStepToggle />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/create-account" element={<CreateAccount />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/report" element={<ReportPage />} />
          <Route path="/account" element={<AccountPage />} /> {/* Account page route */}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
