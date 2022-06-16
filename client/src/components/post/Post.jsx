import React, { useState, useEffect } from 'react';
import './post.css'
import { MoreVert } from '@mui/icons-material';
import { GetUser } from '../../services/userApi';
import { format } from 'timeago.js'
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { likeDislikePosts } from '../../services/likesApi';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { deletePost } from '../../services/postsApi';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import { useDispatch } from 'react-redux';
import Share from '../share/Share';
import { getAllCommentsByPostId, likeDislikeComments, deleteComment } from '../../services/commentsApi';
import { AddedClick, NulifyClicks } from '../../actions/clickedAction';
import ReactPlayer from 'react-player'
import { io } from 'socket.io-client'


const Post = ({ post, commentsPost, socket }) => {

    const dispatch = useDispatch()
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const { user: currentUser } = useSelector(state => state.userReducer)
    const [clicked, setClicked] = useState(false)
    const [commentsOpen, setCommentsOpen] = useState(false)
    const [modifyData, setModifyData] = useState(false)
    const { amountAddedPosts } = useSelector(state => state.isAllPostsReducer)
    const { amountClicks } = useSelector(state => state.clickedReducer)

    const [comments, setComments] = useState({})

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

    }, [socket]);

    useEffect(() => {
        socket.current.emit("addUser", currentUser._id)
        socket.current.on("getUsers", users => {
        })
    }, [currentUser, socket])

    useEffect(() => {
        setClicked(false)
        setModifyData(false)
    }, [amountAddedPosts])


    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        (async () => {
            const res = await GetUser(post)
            setUser(res.data)
        })()
    }, [post])


    useEffect(() => {
        (async () => {
            const data = await getAllCommentsByPostId(post._id)
            setComments(data)
        })()
    }, [post, amountAddedPosts])




    const likeHandler = () => {
        (async () => {
            try {
                if (!commentsPost) {
                    await likeDislikePosts(post._id, currentUser._id)
                }
                else {
                    await likeDislikeComments(post._id, currentUser._id)
                }
                socket.current.emit("refreshPost");



                dispatch(AmountAddedPosts())
                setLike(isLiked ? like - 1 : like + 1);
                setIsLiked(!isLiked);


            } catch (err) { }

        })()
    }

    const expandClickOption = (e) => {
        e.preventDefault()
        setClicked(!clicked)

        setCommentsOpen(false)
    }

    const commentsHandler = async (e) => {
        e.preventDefault()
        const data = await getAllCommentsByPostId(post._id)
        setComments(data)
        setCommentsOpen(!commentsOpen)
        setClicked(false)
    }



    const changePostClick = (e) => {
        e.preventDefault()
        dispatch(AddedClick())
        if (amountClicks === 1) {
            dispatch(NulifyClicks())
            dispatch(AmountAddedPosts())
        }
        setModifyData(!modifyData)
        setClicked(!clicked)
    }

    const deletePostClick = (e) => {
        (async () => {
            try {
                if (!commentsPost) {
                    await deletePost(post._id, currentUser._id, currentUser.isAdmin)

                }
                else {
                    await deleteComment(post._id, currentUser._id, currentUser.isAdmin)
                }
                socket.current.emit("refreshPost");
                dispatch(AmountAddedPosts())
                setClicked(!clicked)
            } catch (err) { }

        })()

    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`/profile/${user.username}`}>
                            <img
                                className="postProfileImg"
                                src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"}
                                alt=""
                            />
                        </Link>

                        <span className="postUsername">
                            {user.username}
                        </span>
                        {!comments ?
                            <span className="postDate">{format(post.createdAt)}</span>
                            : <span className="postDate">{format(post.createdAt)}</span>
                        }
                    </div>
                    {((user.username === currentUser.username) || currentUser.isAdmin) && (
                        !clicked
                            ? <div className="postTopRight">
                                <MoreVert onClick={expandClickOption} />
                            </div>
                            : <div className="postTopRight">
                                <ModeEditIcon onClick={changePostClick} />
                                <DeleteIcon onClick={deletePostClick} />
                                <MoreVert onClick={expandClickOption} />
                            </div>
                    )}
                </div>
                {modifyData ?
                    <Share socket={socket} change={true} postId={post._id} comments={commentsPost} />
                    : <>
                        <div className="postCenter">
                            <span className="postText">{post?.description}</span>
                            {
                                post?.file?.includes('.mp4') ?

                                    <ReactPlayer width='100%' height='100%' controls={true} url={PUBLIC_FOLDER + post?.file} />   

                                    :
                                    <img className="postImg" src={PUBLIC_FOLDER + post?.file} alt="" />
                            }


                        </div>
                        <div className="postBottom">
                            <div className="postBottomLeft">
                                <img className="likeIcon" src={`${PUBLIC_FOLDER}heart.png`} onClick={likeHandler} alt="" />
                                <span className="postLikeCounter">{post.likes.length} people like it</span>
                            </div>
                            {!commentsPost && (
                                <div className="postBottomRight">
                                    <span className="postCommentText" onClick={commentsHandler}>{comments.length} comments</span>
                                </div>
                            )}

                        </div>
                    </>}
                {commentsOpen ?
                    <>

                        <div className="post">
                            <div className="postWrapper">
                                <Share socket={socket} comments={true} postId={post._id} />


                                {comments.map((comment, index) => (
                                    <Post socket={socket} key={comment._id} post={comment} commentsPost={true} />

                                ))}

                            </div>
                        </div>

                    </>
                    : <></>
                }

            </div>
        </div>
    );
}

export default Post;