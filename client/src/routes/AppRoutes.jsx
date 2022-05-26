import React, { useContext } from 'react';
import { Route, Routes, Navigate } from 'react-router-dom'
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import { useSelector } from 'react-redux';
import RequireAuth from '../hoc/requireAuth';


const AppRoutes = (props) => {

    const { user} = useSelector(state => state.userReducer)

    return (

        <>
            <Routes>
                <Route path="/" element={ user ? <Home /> : <Login />} />
                <Route path="/login" element={
                    <RequireAuth><Login /> </RequireAuth>
                } />
                <Route path="/profile/:username" element={  user ? <Profile /> : <Login />} />
                <Route path="/register" element={
                    <RequireAuth><Register /> </RequireAuth>
                } />
            </Routes>
        </>
    );
}

export default AppRoutes;