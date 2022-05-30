import axios from "axios"
import { LoginStart, LoginSuccess , LoginFailure } from "../actions/authAction";
import { LoginStartUser, LoginSuccessUser , LoginFailureUser } from "../actions/userAction";



export const loginInit = async (userCredential, dispatch) => {
    dispatch(LoginStart());
    dispatch(LoginStartUser())
    try {
        const res = await axios.post('http://localhost:8000/api/auth/login', userCredential)
        localStorage.setItem("user", JSON.stringify(res.data))
        dispatch(LoginSuccessUser(res.data))
        dispatch(LoginSuccess())


    } catch (err) {
        dispatch(LoginFailureUser())
        dispatch(LoginFailure(err))
    }
}