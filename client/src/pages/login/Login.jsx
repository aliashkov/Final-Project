import React, { useContext, useRef } from 'react';
import './login.css'
import { loginInit } from '../../services/loginApi';
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';




const Login = () => {

    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const { isFetching} = useSelector(state => state.authReducer)
    const { user} = useSelector(state => state.userReducer)
    const navigate = useNavigate();
    localStorage.setItem("user", null)
    
    
    const handleClick = (e) => {
        e.preventDefault();
    };

    const loginClick = (e) => {
        e.preventDefault();
        loginInit(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
        
        navigate('/');
    };

    const registerClick = (e) => {
        e.preventDefault();
        navigate('/register');
    };

    return (
        <div className="login">
            <div className="loginWrapper">
                <div className="loginLeft">
                    <h3 className="loginLogo">Social Media</h3>
                    <span className="loginDesc">
                        Login to My Social
                    </span>
                </div>
                <div className="loginRight">
                    <form className="loginBox" onSubmit={handleClick}>
                        <input placeholder="Email" type="email" required className="loginInput" ref={email} />
                        <input placeholder="Password" required minLength="6" type="password" className="loginInput" ref={password} />
                        <button className="loginButton"  onClick={loginClick} disabled={isFetching}>

                            {isFetching ? (
                                <CircularProgress size='20px' style={{ 'color': 'yellow'}} />
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <button className="loginRegisterButton" onClick={registerClick}>
                            Create New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;