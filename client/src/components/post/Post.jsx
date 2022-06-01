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
import { addPost } from '../../services/postsApi';
import { PermMedia, Cancel } from '@mui/icons-material';
import { UploadFile } from '../../services/uploadApi';


const Post = ({ post }) => {

    const dispatch = useDispatch()
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})
    const { user: currentUser } = useSelector(state => state.userReducer)
    const [clicked, setClicked] = useState(false)
    const [modifyData, setModifyData] = useState(false)
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("")
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


    
    const submitHandler = async (e) => {
        e.preventDefault();
        if (description !== "") {
            const newPost = {
                userId: currentUser._id,
                description: description
            };
            const data = new FormData();
            if (file) {
                const fileName = Date.now() + file.name;
                data.append("name", fileName);
                data.append("file", file);
                newPost.img = fileName;
                console.log(newPost.img)
                try {
                    await UploadFile(data , currentUser)
                } catch (err) { }
            }
            try {
                await addPost(newPost)
                dispatch(AmountAddedPosts())
                setFile(null)
                setDescription("")
                document.getElementById("shareInputId").value = "";
                //window.location.reload()
            } catch (err) { }
        }
        else {
            alert("You must input some data before sending")
        }

    };




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
                        <span className="postDate">{format(post.createdAt)}</span>
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
                    <div className='share'>
                        <div className="shareWrapper">
                            <div className="shareTop">
                                <img className='shareProfileImg' src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                                <input
                                    placeholder='Input your thoughts'
                                    className="shareInput"
                                    id="shareInputId"
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <hr className="shareHr" />
                            {file && (
                                <div className="shareImgContainer">
                                    <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                                    <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                                </div>
                            )}
                            <form className="shareBottom" onSubmit={submitHandler}>
                                <div className="shareOptions">
                                    <label htmlFor="file" className="shareOption">
                                        <PermMedia htmlColor='tomato' className='shareIcon' />
                                        <span className='shareOptionText'>Photo</span>
                                        <input type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
                                    </label>
                                </div>
                                <button className='shareButton' type="submit"> Share </button>
                            </form>
                        </div>
                    </div>
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
                            <div className="postBottomRight">
                                <span className="postCommentText">{post.comment} comments</span>
                            </div>
                        </div>
                    </>}

            </div>
        </div>
    );
}

export default Post;