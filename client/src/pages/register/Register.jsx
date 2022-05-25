import React, {useRef} from 'react';
import './register.css'
import axios from 'axios';
import {useNavigate } from 'react-router-dom'
import { registerCall } from '../../services/registerApi';



const Register = () => {
    
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    const navigate = useNavigate();

    const handleClick = async  (e) => {
        e.preventDefault();
        if (passwordConfirm.current.value !== password.current.value) {
            passwordConfirm.current.setCustomValidity("Passwords don't match!")
        } else {
            const user = { 
                username : username.current.value , 
                email : email.current.value,
                password :  password.current.value
            }
            console.log(user)
            try {
                const res = await registerCall(user)
                navigate('/login');
            } catch(err) {
               console.log(err)
            }
            
        }
        

    };
    


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
                    <form className="registerBox" onSubmit={handleClick}>
                        <input placeholder="Username" required ref={username} className="registerInput" />
                        <input placeholder="Email" required ref={email}  type="email" className="registerInput" />
                        <input placeholder="Password" required ref={password} minLength="6" type="password" className="registerInput" />
                        <input placeholder="Password Confirm" required ref={passwordConfirm} minLength="6"  type="password" className="registerInput" />
                        <button className="registerButton" type='submit'>Sign Up</button>
                        <button className="loginRegisterButton">
                            Log in To Your Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;