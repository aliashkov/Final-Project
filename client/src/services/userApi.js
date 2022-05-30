import axios from 'axios'

export const GetUser = async (post) => {
    const res = await axios.get(`http://localhost:8000/api/users?userId=${post.userId}`)
    return res
}

export const GetProfileUser = async (username) => {
    const res = await axios.get(`http://localhost:8000/api/users?userid=${username}`)
    return res
}

export const changeUser  = async (editUser , userId) => {
    const res = await axios.put(`http://localhost:8000/api/users/${userId}`, editUser);
    return res
}



