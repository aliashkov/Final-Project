import React, { useRef, useState } from 'react';
import './register.css'
import { useNavigate } from 'react-router-dom'
import { registerCall } from '../../services/registerApi';
import PasswordChecklist from "react-password-checklist"



const Register = () => {

    const username = useRef();
    const email = useRef();
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    const navigate = useNavigate();

    const handleClick = async (e) => {
        e.preventDefault();
        if (password !== passwordConfirm) {
            alert("Passwords doesn't match")
        } else {
            const user = {
                username: username.current.value,
                email: email.current.value,
                password: password
            }
            try {
                await registerCall(user)
                navigate('/login');
            } catch (err) {
                if (err.code === "ERR_BAD_RESPONSE")
                    alert("This user already exists")
                else
                    alert(err.response.data)
            }
        }
    };

    const loginClick = (e) => {
        e.preventDefault();
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
                        <input placeholder="Username" onKeyPress={(event) => {
                            if (!/[a-zA-Z0-9]/.test(event.key)) {
                                event.preventDefault();
                            }
                        }} required ref={username} className="registerInput" />
                        <input placeholder="Email" required ref={email} type="email" className="registerInput" />
                        <input placeholder="Password" required minLength="6" onChange={e => setPassword(e.target.value)} type="password" className="registerInput" />
                        <input placeholder="Password Confirm" required minLength="6" onChange={e => setPasswordConfirm(e.target.value)} type="password" className="registerInput" />
                        <div className='passwordsMessageWrapper'>
                            <PasswordChecklist
                                rules={["minLength", "match"]}
                                minLength={6}
                                value={password}
                                valueAgain={passwordConfirm}
                                messages={{
                                    minLength: "Password length less than 6 symbols",
                                    match: "Password don't match",
                                }}
                            />
                        </div>

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