import axios from 'axios'

export const GetConversations = async (userId) => {
    const res = await axios.get(`http://localhost:8000/api/conversations/` + userId)
    return res.data
}