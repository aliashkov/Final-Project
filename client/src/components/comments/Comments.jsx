import React, { useState, useEffect } from 'react';
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


const Comments = ({ post }) => {

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


    const likeHandler = () => {
        (async () => {
            try {
                await likeDislikePosts(post._id, currentUser._id)
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

    const commentsHandler = (e) => {
        e.preventDefault()
        setCommentsOpen(!commentsOpen)
        setClicked(false)
    }



    const changePostClick = (e) => {
        e.preventDefault()
        setModifyData(!modifyData)
        setClicked(!clicked)
    }

    const deletePostClick = (e) => {
        (async () => {
            try {
                await deletePost(post._id, currentUser._id)
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
                        <span className="postDate">{format(post.updatedAt)}</span>
                    </div>
                    {user.username === currentUser.username && (
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
                    <Share change={true} postId={post._id} />
                    : <>
                        <div className="postCenter">
                            <span className="postText">{post?.description}</span>
                            <img className="postImg" src={PUBLIC_FOLDER + post.img} alt="" />
                        </div>
                        <div className="postBottom">
                            <div className="postBottomLeft">
                                <img className="likeIcon" src={`${PUBLIC_FOLDER}heart.png`} onClick={likeHandler} alt="" />
                                <span className="postLikeCounter">{like} people like it</span>
                            </div>
                        </div>
                    </>}
            </div>
        </div>
    );
}

export default Comments;