import React, { useEffect, useState } from 'react';
import './feed.css'
import Share from '../share/Share';
import Post from '../post/Post';
import axios from 'axios'
import { GetPosts, getProfilePosts } from '../../services/GetPosts';


const Feed = ({username}) => {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        (async () => {
            const res = username ? await getProfilePosts(username) : await GetPosts() ;
            setPosts(res.data);
        })()
        
    }, [username])

    return (
        <div className='feed'>
            <div className="feedWrapper">
                <Share />
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