import React, { useEffect, useState, useRef } from 'react';
import './feed.css'
import Share from '../share/Share';
import Post from '../post/Post';
import { getProfilePosts, getTimelinePosts, getAllPosts } from '../../services/postsApi';
import { useSelector } from 'react-redux';
import { GetUsers } from '../../services/userApi';
import InfiniteScroll from 'react-infinite-scroller';

const TOTAL_PAGES = 3;


const Feed = ({ username }) => {
    const [count, setCount] = useState(0);
    const ref = useRef(null);
    const [posts, setPosts] = useState([])
    const [size, setSize] = useState(3)
    const lastItemRef = useRef();
    const observer = useRef();
    const { user } = useSelector(state => state.userReducer)
    const { isAllPosts } = useSelector(state => state.isAllPostsReducer)
    const { amountAddedPosts } = useSelector(state => state.isAllPostsReducer)

    const [arr, setArr] = useState([]);
    const [currentLength, setCurrentLength] = useState(3)

    const [page, setPage] = useState(1);


    useEffect(() => {
        (async () => {
            const res = username ? await getProfilePosts(username) :
                isAllPosts ? await getAllPosts(user._id) : await getTimelinePosts(user._id)
            console.log(666)
            setPosts(res.data.sort((post1, post2) => {
                return new Date(post2.updatedAt) - new Date(post1.updatedAt)
            }));
        })()

    }, [username, user, isAllPosts, amountAddedPosts])


    useEffect(() => {
        setCurrentLength(3)
        setArr([...posts].slice(0, currentLength))
    }, [posts, username, user, isAllPosts])

    useEffect(() => {
        const options = {
            root: document,
            threshold: 1
        };
        const callback = (entries) => {
            if (currentLength === posts.length) {
            }
            else if (entries[0].isIntersecting) {
                const newPage = page + 1;
                setCurrentLength(currentLength + 1)
                setArr([...posts].slice(0, currentLength))
                setPage(newPage);
            }
        };
        observer.current = new IntersectionObserver(callback, options);
        if (lastItemRef.current) {
            observer.current.observe(lastItemRef.current);
        }
        return () => {
            observer.current.disconnect();
        };
    });

    return (




        <div className='feed'>
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}
                {arr.map((a, i) => {
                    if (i === arr.length - 1) {
                        return (
                            <p key={a} ref={lastItemRef}>
                            </p>

                        );
                    }
                    return <Post key={a._id} post={a} />
                })}

            </div>
        </div >


    )
}

export default Feed;