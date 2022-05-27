import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react';

const RequireAuth = ({ children }) => {
  const { user } = useSelector(state => state.authReducer)

  if (user) {
  
    return <Navigate to='/'></Navigate>
  }
  return children
}


export default RequireAuth;