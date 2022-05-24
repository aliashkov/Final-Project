import axios from 'axios'

export const registerCall = async (user) => {
    const res = await axios.post('http://localhost:8000/api/auth/register' , user);
    return res;
}