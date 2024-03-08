import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedLayer({ children }) {
  let token = localStorage.getItem("token");

  try {
    const decoded = jwtDecode(token);
  } catch (error) {
    localStorage.clear();
    return <Navigate to="/signIn" />;
  }

  if (token) return children;
  
  return <Navigate to="/signIn" />;
}
