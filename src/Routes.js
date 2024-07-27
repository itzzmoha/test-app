// src/Routes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import WelcomePage from './WelcomePage';
import LoginPage from './LoginPage';
import ForgotPasswordPage from './ForgotPasswordPage';
import SignupPage from './SignupPage';
import HomePage from './HomePage';
import TasksPage from './TasksPage';
import ProgressPage from './ProgressPage';
import ChatPage from './ChatPage';
import NotFoundPage from './NotFoundPage';
import PrivateRoute from './PrivateRoute'; // Ensure correct import

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<WelcomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      
      {/* Protected routes */}
      <Route path="/home" element={<PrivateRoute element={<HomePage />} />} />
      <Route path="/tasks" element={<PrivateRoute element={<TasksPage />} />} />
      <Route path="/progress" element={<PrivateRoute element={<ProgressPage />} />} />
      <Route path="/chat" element={<PrivateRoute element={<ChatPage />} />} />
      
      {/* Catch-all route for undefined paths */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default AppRoutes;
