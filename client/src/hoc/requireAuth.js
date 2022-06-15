import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react';

const RequireAuth = ({ children }) => {
  let user = localStorage.getItem('user');
  if (user === null) {
    return children
  }
  if (user !== "null") {
    console.log(11)
    return <Navigate to='/'></Navigate>
  }
  return children
}


export default RequireAuth;