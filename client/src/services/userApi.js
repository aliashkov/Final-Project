import axios from 'axios'

export const GetUser = async (post) => {
    const res = await axios.get(`http://localhost:8000/api/users?userId=${post.userId}`)
    return res
}

export const GetProfileUser = async (username) => {
    const res = await axios.get(`http://localhost:8000/api/users?username=${username}`)
    return res
}



