import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

const RedirectIfAuthenticated = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  // While loading, don't show anything yet
  if (loading) return null;

  // If user is authenticated, redirect to dashboard
  if (user) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RedirectIfAuthenticated;
