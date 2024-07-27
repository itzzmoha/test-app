// src/NotFoundPage.js
import React from 'react';
import './NotFoundPage.css';

function NotFoundPage() {
  return (
    <div className="not-found-page">
      <div className="not-found-icon">🚫</div>
      <h1>404</h1>
      <p>Oops! The page you’re looking for doesn’t exist.</p>
      <button className="btn-home" onClick={() => window.location.href = '/home'}>
        Go to Home
      </button>
      <footer>
        &copy; {new Date().getFullYear()} Your Website. All Rights Reserved.
      </footer>
    </div>
  );
}

export default NotFoundPage;
