import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from './firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import './SignupPage.css';

function SignupPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (event) => {
    event.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Save the username to Firestore
      await setDoc(doc(firestore, 'users', user.uid), {
        username: username,
      });
      navigate('/home');
    } catch (error) {
      setErrorMessage(error.message);
    }
  };

  const handleBackToLogin = () => {
    navigate('/login');
  };

  return (
    <div className="signup-page">
      <div className="signup-block">
        <h1 className="signup-title">Sign Up</h1>
        <form onSubmit={handleSignup} className="signup-form">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="input-field"
          />
          <button type="submit" className="signup-button">Sign Up</button>
          {errorMessage && <p className="error-message">{errorMessage}</p>}
        </form>
        <button className="back-button" onClick={handleBackToLogin}>Back to Login</button>
      </div>
    </div>
  );
}

export default SignupPage;
