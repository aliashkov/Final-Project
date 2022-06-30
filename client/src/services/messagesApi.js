import axios from 'axios'

export const GetMessages = async (currentChatId) => {
    const res = await axios.get(`http://localhost:8000/api/messages/` + currentChatId)
    return res.data
}

export const SendMessage = async (message) => {
    const res = await axios.post(`http://localhost:8000/api/messages/` , message)
    return res;
}

export const deleteMessage = async (messageId, currentUserId , admin) => {
    return await axios.delete(`http://localhost:8000/api/messages/${messageId}`, { data: { userId: currentUserId, isAdmin : admin } });
}


export const updateMessage = async (messageId, currentUserId ,  text , admin) => {
    return await axios.put(`http://localhost:8000/api/messages/${messageId}`, {
        userId: currentUserId,
        text : text ,
        isAdmin : admin ,
    });
}