import React from 'react';
import './register.css'



const Register = () => {
    return (
        <div className="register">
            <div className="registerWrapper">
                <div className="registerLeft">
                    <h3 className="registerLogo">Social Media</h3>
                    <span className="registerDesc">
                        Sign Up to My Social
                    </span>
                </div>
                <div className="registerRight">
                    <div className="registerBox">
                        <input placeholder="Username" className="registerInput" />
                        <input placeholder="Email" className="registerInput" />
                        <input placeholder="Password" className="registerInput" />
                        <input placeholder="Password Confirm" className="registerInput" />
                        <button className="registerButton">Sign Up</button>
                        <button className="loginButton">
                            Log in To Your Account
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;