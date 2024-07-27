import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import Firebase functions
import './ForgotPasswordPage.css'; // Import the CSS file

function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [infoMessage, setInfoMessage] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleSubmit = (event) => {
    event.preventDefault();
    if (email === '') {
      setErrorMessage('Please enter your email address');
      setInfoMessage('');
    } else {
      const auth = getAuth();
      sendPasswordResetEmail(auth, email)
        .then(() => {
          console.log('Password reset email sent:', email);
          setInfoMessage('Password reset email sent. Check your inbox for the verification code.');
          setErrorMessage('');
        })
        .catch((error) => {
          console.error('Error sending password reset email:', error);
          setErrorMessage('Error sending password reset email. Please try again.');
          setInfoMessage('');
        });
    }
  };

  return (
    <div className="forgot-password-page">
      <div className="forgot-password-block">
        <button className="back-button" onClick={() => navigate('/login')}>Back</button>
        <h2 className="forgot-password-title">Forgot Password</h2>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        {infoMessage && <p className="info-message">{infoMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email: </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="email-input"
            placeholder="Enter your email"
          />
          <button type="submit" className="reset-button">Reset</button>
        </form>
        <p className="info-text">You will receive a link via email to reset your password.</p>
      </div>
    </div>
  );
}

export default ForgotPasswordPage;
