import axios from 'axios'

export const likeDislikePosts = (postId, userId) => {

    return axios.put(`http://localhost:8000/api/posts/${postId}/like`, {userId})
}


