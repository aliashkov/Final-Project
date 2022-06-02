import axios from 'axios'

export const followersListUser = (userId) => {

    return axios.get("http://localhost:8000/api/users/followers/" + userId);
}

export const followUser = async (userProfileId, currentUserId) => {
    return await axios.put(`http://localhost:8000/api/users/${userProfileId}/follow`, {
        userId: currentUserId,
    });
}

export const unfollowUser = async (userProfileId, currentUserId) => {
    return await axios.put(`http://localhost:8000/api/users/${userProfileId}/unfollow`, {
        userId: currentUserId,
    });
}




