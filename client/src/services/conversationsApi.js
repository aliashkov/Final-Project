import axios from 'axios'

export const GetConversations = async (userId) => {
    const res = await axios.get(`http://localhost:8000/api/conversations/` + userId)
    return res.data
}


export const newConversation = async (members) => {
    console.log(members)
    const res = await axios.post(`http://localhost:8000/api/conversations/`, members)
    return res.data
}