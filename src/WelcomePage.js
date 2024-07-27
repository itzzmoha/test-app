import React from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import './WelcomePage.css';

function WelcomePage() {
  const navigate = useNavigate(); // Create navigate function

  const handleLoginClick = () => {
    navigate('/login'); // Navigate to LoginPage
  };

  const handleSignupClick = () => {
    navigate('/signup'); // Navigate to SignupPage
  };

  return (
    <div className="welcome-page">
        <h1 className="productivity-trick">Productivity Trick</h1>
        <header></header>
        <section className="hero">
            <button className="login-button" onClick={handleLoginClick}>Login</button>
            <button className="signup-button" onClick={handleSignupClick}>Signup</button>
        </section>
        <section className="blocks-section">
            <div className="block">
                <div className="user-pic">
                    <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600' alt="User 1" />
                </div>
                <div className="user-name">User 1</div>
                <div className="user-avis">
                    <span className="star-emoji">⭐</span> Review 1
                </div>
            </div>
            <div className="block">
                <div className="user-pic">
                    <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600' alt="User 2" />
                </div>
                <div className="user-name">User 2</div>
                <div className="user-avis">
                    <span className="star-emoji">⭐</span> Review 2
                </div>
            </div>
            <div className="block">
                <div className="user-pic">
                    <img src='https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=600' alt="User 3" />
                </div>
                <div className="user-name">User 3</div>
                <div className="user-avis">
                    <span className="star-emoji">⭐</span> Review 3
                </div>
            </div>
        </section>
        <footer><center>&copy;2024 Copyright by Productivity Trick</center></footer>
    </div>
  );
}

export default WelcomePage;
