import axios from 'axios'

export const GetNotifications = async (userId) => {
    const res = await axios.get(`http://localhost:8000/api/notifications/` + userId)
    return res.data
}

export const DeleteNotifications = async (userId) => {
    return await axios.delete(`http://localhost:8000/api/notifications/${userId}`);
}

export const newNotification = async (currentUserId, senderId , typeNotification) => {
    return await axios.post(`http://localhost:8000/api/notifications/`, {
        userId: currentUserId,
        sender: senderId,
        type: typeNotification,

    })
}