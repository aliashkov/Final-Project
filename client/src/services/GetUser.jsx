import axios from 'axios'

export const GetUser = async (post) => {
    const res = await axios.get(`http://localhost:8000/api/users?userId=${post.userId}`)
    return res
}

export const GetProfileUser = async (post) => {
    const res = await axios.get(`http://localhost:8000/api/users?username=egor`)
    return res
}

