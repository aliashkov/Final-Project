import axios from 'axios'

export const getTimelinePosts = async (userId) => {
    const res = await axios.get(`http://localhost:8000/api/posts/timeline/${userId}`)
    return res
}

export const getAllPosts = async (userId) => {
    const res = await axios.get(`http://localhost:8000/api/posts/all/${userId}`)
    return res
}

export const getProfilePosts = async (username) => {
    const res = await axios.get(`http://localhost:8000/api/posts/profile/${username}`)
    return res
}

export const addPost = async (newPost) => {
    return await axios.post("http://localhost:8000/api/posts", newPost);
}

export const deletePost = async (postId, currentUserId) => {
    return await axios.delete(`http://localhost:8000/api/posts/${postId}`, { data: { userId: currentUserId } });
}
