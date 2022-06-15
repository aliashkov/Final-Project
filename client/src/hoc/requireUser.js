import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import React from 'react';

const RequireUser = ({ children }) => {
    const { user } = useSelector(state => state.userReducer)
    if (!user) {
        return <Navigate to='/login'></Navigate>
    }
    return children
}


export default RequireUser;