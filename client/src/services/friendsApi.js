import axios from 'axios'

export const followersListUser = async (userId) => {
    try {
        const res = await axios.get("http://localhost:8000/api/users/followers/" + userId);
        return res;
    } catch (err) {
        console.log(err)
    }
}

export const followingsListUser = (userId) => {

    return axios.get("http://localhost:8000/api/users/followings/" + userId);
}


export const friendsListUser = (userId) => {

    return axios.get("http://localhost:8000/api/users/friends/" + userId);
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


export const addFriend = async (userProfileId, currentUserId) => {

    return await axios.put(`http://localhost:8000/api/users/${userProfileId}/addfriend`, {
        userId: currentUserId,
    });
}

export const removeFriend = async (userProfileId, currentUserId) => {

    return await axios.put(`http://localhost:8000/api/users/${userProfileId}/removefriend`, {
        userId: currentUserId,
    });
}




