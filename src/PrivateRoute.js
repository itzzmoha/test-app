// src/PrivateRoute.js
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase'; // Ensure correct path

const PrivateRoute = ({ element: Element }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe(); // Clean up subscription
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator while checking auth status
  }

  return isAuthenticated ? Element : <Navigate to="/login" />;
};

export default PrivateRoute;
