import axios from 'axios'

export const GetMessages = async (currentChatId) => {
    const res = await axios.get(`http://localhost:8000/api/messages/` + currentChatId)
    return res.data
}

export const SendMessage = async (message) => {
    console.log(message)
    const res = await axios.post(`http://localhost:8000/api/messages/` , message)
    return res;
}

export const deleteMessage = async (messageId, currentUserId , admin) => {
    return await axios.delete(`http://localhost:8000/api/messages/${messageId}`, { data: { userId: currentUserId, isAdmin : admin } });
}