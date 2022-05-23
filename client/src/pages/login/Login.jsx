import React from 'react';
import './login.css'



const Login = () => {
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
                    <div className="loginBox">
                        <input placeholder="Email" className="loginInput" />
                        <input placeholder="Password" className="loginInput" />
                        <button className="loginButton">Log In</button>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;