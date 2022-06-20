import React from 'react';
import { Route, Routes } from 'react-router-dom'
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import Profile from '../pages/profile/Profile';
import Register from '../pages/register/Register';
import { useSelector } from 'react-redux';
import RequireAuth from '../hoc/requireAuth';
import EditingProfile from '../pages/editingProfile/EditingProfile'
import Messenger from '../pages/messenger/Messenger';
import RequireUser from '../hoc/requireUser';


const AppRoutes = (props) => {

    const { user } = useSelector(state => state.userReducer)

    console.log(user)

    return (

        <>
            <Routes>
                <Route path="/" element={
                    <RequireUser user={user}><Home /> </RequireUser>
                } />
                <Route path="/login" element={
                    <RequireAuth><Login /> </RequireAuth>
                } />
                <Route path="/profile/:username" element={
                   <RequireUser user={user}><Profile /> </RequireUser>
                } />
                <Route path="/register" element={
                    <RequireAuth user={user}><Register /> </RequireAuth>
                } />
                <Route path="/editing" element={
                    <RequireUser user={user}><EditingProfile /> </RequireUser>
                } />
                <Route path="/messenger" element={
                    <RequireUser user={user}><Messenger /> </RequireUser>
                } />

            </Routes>
        </>
    );
}

export default AppRoutes;