import axios from "axios"

export const loginInit = async (userCredential, dispatch) => {
    dispatch({ type: "LOGIN_START" })
    dispatch({ type: "LOGIN_START_USER" })
    try {
        const res = await axios.post('http://localhost:8000/api/auth/login', userCredential)
        localStorage.setItem("user", JSON.stringify(res.data))
        dispatch({ type: "LOGIN_SUCCESS_USER", payload: res.data })
        dispatch({ type: "LOGIN_SUCCESS"})


    } catch (err) {
        dispatch({ type: "LOGIN_FAILURE_USER"})
        dispatch({ type: "LOGIN_FAILURE", payload: err })
    }
}