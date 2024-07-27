import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import './LoginPage.css';

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const auth = getAuth();

  const handleBackClick = () => {
    navigate('/');
  };

  const handleForgotPasswordClick = () => {
    navigate('/forgot-password');
  };

  const handleSignupClick = () => {
    navigate('/signup');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Store userId and username if needed
      localStorage.setItem('userId', user.uid); 
      navigate('/home', { state: { userId: user.uid } }); // Pass userId to HomePage
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password'); // Display a general error message
    }
  };

  return (
    <div className="login-page">
      <div className="login-block">
        <button className="back-button" onClick={handleBackClick}>Back</button>
        <h1 className="login-title">Login</h1>
        <form className="login-form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            className="input-field"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Login</button>
          <button type="button" className="forgot-password-button" onClick={handleForgotPasswordClick}>Forgot Password</button>
          <button type="button" className="signup-button" onClick={handleSignupClick}>Signup</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
