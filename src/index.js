import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import AppRoutes from './Routes'; // Import your Routes component
import './index.css'; // Import global styles

ReactDOM.render(
  <React.StrictMode>
    <Router> {/* Wrap AppRoutes with Router */}
      <AppRoutes />
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);
