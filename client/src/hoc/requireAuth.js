import { Navigate } from "react-router-dom";
import React from 'react';

const RequireAuth = ({ children }) => {
  let user = localStorage.getItem('user');
  if (user === null) {
    return children
  }
  if (user !== "null") {
    return <Navigate to='/'></Navigate>
  }
  return children
}


export default RequireAuth;