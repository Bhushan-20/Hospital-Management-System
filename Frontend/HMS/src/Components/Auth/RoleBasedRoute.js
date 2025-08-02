import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const RoleBasedRoute = ({ children, allowedRoles }) => {
  const token = useSelector((state) => state.jwt);

  if (!token) return <Navigate to="/login" />;

  try {
    const user = jwtDecode(token);

    if (!allowedRoles.includes(user.role)) {
      return <Navigate to={`/${user.role}/dashboard`} />; // Redirect to their dashboard
    }

    return children;
  } catch (error) {
    return <Navigate to="/login" />;
  }
};

export default RoleBasedRoute;
