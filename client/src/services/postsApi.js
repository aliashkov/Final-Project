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

export const changePost = async (postId , changedPost) => {
    if (changedPost.img === undefined)
        changedPost.img = "";
    return await axios.put(`http://localhost:8000/api/posts/${postId}`, changedPost);
}



export const deletePost = async (postId, currentUserId , admin) => {
    return await axios.delete(`http://localhost:8000/api/posts/${postId}`, { data: { userId: currentUserId, isAdmin : admin } });
}
