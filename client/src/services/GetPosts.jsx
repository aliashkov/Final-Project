import axios from 'axios'

export const GetPosts = async () => {
    const res = await axios.get('http://localhost:8000/api/posts/timeline/628b52fd781bd7f4f5c21919')
    return res
}

export const getProfilePosts = async (username) => {
    const res = await axios.get(`http://localhost:8000/api/posts/profile/${username}`)
    return res
}
