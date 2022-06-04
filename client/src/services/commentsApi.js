import axios from 'axios'

export const getAllCommentsByPostId = async (postId) => {
    const res = await axios.get(`http://localhost:8000/api/posts/comments/${postId}`)
    return res.data
}

export const addComment  = async (postId, newPost) => {
    newPost.postId = postId;
    return await axios.post("http://localhost:8000/api/comments", newPost);
}

export const likeDislikeComments = (postId, userId) => {

    return axios.put(`http://localhost:8000/api/comments/${postId}/like`, {userId})
}