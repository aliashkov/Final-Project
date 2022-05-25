import React, { useEffect, useState } from 'react';
import './feed.css'
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios'
import { GetPosts, getProfilePosts, getTimelinePosts } from '../../services/postsApi';
import { useSelector } from 'react-redux';


const Feed = ({ username }) => {
    const [posts, setPosts] = useState([])
    const { user } = useSelector(state => state.authReducer)

    useEffect(() => {
        (async () => {
            const res = username ? await getProfilePosts(username) : await getTimelinePosts(user._id);
            setPosts(res.data.sort((post1, post2) => {
                return new Date(post2.createdAt) - new Date(post1.createdAt)
            }));
        })()

    }, [username, user._id])

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