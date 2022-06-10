import axios from 'axios'

export const GetMessages = async (currentChatId) => {
    const res = await axios.get(`http://localhost:8000/api/messages/` + currentChatId)
    return res.data
}

export const SendMessage = async (message) => {
    const res = await axios.post(`http://localhost:8000/api/messages/` , message)
    return res;
}