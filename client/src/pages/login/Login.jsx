import React, {useContext, useRef} from 'react';
import './login.css'
import { loginCall } from '../../services/LoginApi';
import { AuthContext } from '../../context/AuthContext';



const Login = () => {

    const email = useRef()
    const password = useRef()
    const {user, isFetching , error , dispatch} = useContext(AuthContext)

    const handleClick = (e) => {
        e.preventDefault()
        loginCall({email : email.current.value, password : password.current.value} , dispatch)
    }

    console.log(user)

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
                        <input placeholder="Email" type="email" required className="loginInput" ref={email}/>
                        <input placeholder="Password" required minLength="6" type="password" className="loginInput" ref={password}/>
                        <button className="loginButton">Log In</button>
                        <button className="loginRegisterButton">
                            Create a New Account
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;