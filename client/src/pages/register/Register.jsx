import React, { useRef , useState} from 'react';
import './register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { registerCall } from '../../services/registerApi';


const Register = () => {

    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordConfirm = useRef();
    
    console.log(passwordConfirm)
    console.log(password)
    const navigate = useNavigate();
    const [valid, setValid] = useState(true);

    const handleClick = async (e) => {
        console.log(passwordConfirm.current.value)
        e.preventDefault();
        if (passwordConfirm.current.value !== password.current.value) {
            console.log(555)
            passwordConfirm.current.asyncSetValidity("Passwords don't match!")
        } else {
            console.log(6666)
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password.current.value
            }
            console.log(user)
            try {
                const res = await registerCall(user)
                navigate('/login');
            } catch (err) {
                alert(err)
            }
        }
    };

    const loginClick = (e) => {
        navigate('/login');
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
                        <input placeholder="Email" required ref={email} type="email" className="registerInput" />
                        <input placeholder="Password" required ref={password} minLength="6" type="password" className="registerInput" />
                        <input placeholder="Password Confirm" required ref={passwordConfirm} minLength="6" type="password" className="registerInput" />
                        <button className="registerButton">Sign Up</button>
                        <button className="loginRegisterButton" onClick={loginClick}>
                            Log in To Your Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Register;