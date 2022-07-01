import { Navigate } from "react-router-dom";
import React from 'react';

const RequireUser = ({ children , user }) => {
    if (!user) {
        return <Navigate to='/login'></Navigate>
    }
    return children
}


export default RequireUser;