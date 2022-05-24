import React, { useContext, useRef } from 'react';
import './login.css'
import { loginCall } from '../../services/LoginApi';
import { CircularProgress } from "@mui/material";
import { useDispatch, useSelector } from "react-redux"



const Login = () => {

    const email = useRef();
    const password = useRef();
    const dispatch = useDispatch();
    const { user, isFetching} = useSelector(state => state.authReducer)
    //const { user, isFetching, dispatch } = useContext(AuthContext);
    
    const handleClick = (e) => {
        e.preventDefault();
    };

    const loginClick = (e) => {
        e.preventDefault();
        loginCall(
            { email: email.current.value, password: password.current.value },
            dispatch
        );
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
                        <button className="loginButton" type="submit" onClick={loginClick} disabled={isFetching}>

                            {isFetching ? (
                                <CircularProgress size='20px' style={{ 'color': 'yellow'}} />
                            ) : (
                                "Log In"
                            )}
                        </button>
                        <button className="loginRegisterButton">
                            {isFetching ? (
                                <CircularProgress size='20px' style={{ 'color': 'yellow'}} />
                            ) : (
                                "Create New Account"
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
