import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage'; 
import SignupPage from './SignupPage'; // Import the SignupPage component
import HomePage from './HomePage'; // Import the HomePage component

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} /> {/* Add this route */}
        <Route path="/home" element={<HomePage />} /> {/* Add this route */}
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Routes>
    </Router>
  );
}

export default App;
