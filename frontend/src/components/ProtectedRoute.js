// src/components/ProtectedRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function ProtectedRoute ({ children }) {
  const { authState } = useContext(AuthContext);

  if (!authState.user) {
    return <Navigate to="/login" replace />;
  }

  return children;
};
