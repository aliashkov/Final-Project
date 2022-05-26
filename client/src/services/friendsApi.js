import axios from 'axios'

export const friendsListUser = (userId) => {

    return axios.get("http://localhost:8000/api/users/friends/" + userId);
}