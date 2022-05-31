import React, { useEffect, useState } from 'react';
import './feed.css'
import Share from '../share/Share';
import Post from '../post/Post';
import { getProfilePosts, getTimelinePosts, getAllPosts } from '../../services/postsApi';
import { useSelector } from 'react-redux';
import { GetUsers } from '../../services/userApi';


const Feed = ({ username }) => {
    const [posts, setPosts] = useState([])
    const { user } = useSelector(state => state.userReducer)
    const { isAllPosts } = useSelector(state => state.isAllPostsReducer)
    const { amountAddedPosts} = useSelector(state => state.isAllPostsReducer)

    console.log(amountAddedPosts)

    useEffect(() => {
        (async () => {
            const res = username ? await getProfilePosts(username) : 
            isAllPosts ? await getAllPosts(user._id) : await getTimelinePosts(user._id)
            setPosts(res.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            }));
            //const users = await GetUsers()
            //const result = posts.map(post => ({ ...post, ...users.find(user => post.userId === user._id) }));
            //setPosts(result)
            //console.log(result)
            //console.log([...posts].filter(post => post.description.toLowerCase().includes(searchString.toLowerCase())))
        })()

    }, [username, user, isAllPosts, amountAddedPosts])


    return (
        <div className='feed'>
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {

                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))
                }
            </div>
        </div>
    )
}

export default Feed;