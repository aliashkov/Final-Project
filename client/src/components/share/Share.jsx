import React, { useState, useEffect } from 'react';
import './share.css'
import { PermMedia, Cancel } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { UploadFile } from '../../services/uploadApi';
import { addPost, getPost } from '../../services/postsApi';
import { useDispatch } from 'react-redux';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import { changePost } from '../../services/postsApi';
import { addComment, changeComment } from '../../services/commentsApi';
import { NulifyClicks } from '../../actions/clickedAction';
import { io } from 'socket.io-client'
import ReactPlayer from 'react-player'
import { newNotification } from '../../services/notificationsApi';
import { getComment } from '../../services/commentsApi';


const Share = ({ postId, change, comments, socket }) => {
    const { user } = useSelector(state => state.userReducer)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [filePost, setFilePost] = useState(null);
    const [description, setDescription] = useState("")
    const dispatch = useDispatch();
    

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

    }, [socket]);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
        })
    }, [user, socket])


    useEffect(() => {

        socket.current.on("refreshPosts", amountRefreshes => {

            dispatch(AmountAddedPosts())

        })


        //socket.disconnect();

    }, [socket, dispatch])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (description !== "" || filePost) {
            const newPost = {
                userId: user._id,
                description: description,
                isAdmin: user.isAdmin
            };
            const data = new FormData();
            if (filePost) {
                const fileName = Date.now() + filePost.name;
                data.append("name", fileName);
                data.append("file", filePost);
                newPost.file = fileName;
                try {
                    await UploadFile(data, user)
                } catch (err) { }
            }
            try {
                if (!comments) {
                    if (change)
                        await changePost(postId, newPost)
                    else
                        await addPost(newPost)
                }
                else {
                    if (change) {
                        await changeComment(postId, newPost)
                        const res = await getComment(postId)
                        const post = await getPost(res.postId)
                        if (post.userId !== user._id) {
                            await newNotification(post.userId, user.username, 'changes comment in your post')
                        }
                    }
                    else {
                        await addComment(postId, newPost);
                        const res = await getPost(postId)
                        if (res.userId !== user._id) {
                            await newNotification(res.userId, user.username, 'leaves comment in your post')
                        }
                    }

                }
                dispatch(NulifyClicks())
                dispatch(AmountAddedPosts())
                socket.current.emit("refreshPost");
                setFilePost(null)
                setDescription("")
                if (!comments) {
                    document.querySelector("#shareInputId").value = "";
                }
                else {
                    document.querySelector("#shareInputIdComments").value = "";
                }

            } catch (err) { }
        }
        else {
            alert("You must input some data before sending")
        }

    };


    return (
        <div className='share'>
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className='shareProfileImg' src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />


                    {!comments ? (
                        <>
                            <input
                                placeholder='Input your thoughts'
                                className="shareInput"
                                id="shareInputId"
                                onChange={e => setDescription(e.target.value)}
                            />

                        </>

                    ) :
                        <input
                            placeholder='Input your thoughts'
                            className="shareInput"
                            id="shareInputIdComments"
                            onChange={e => setDescription(e.target.value)}
                        />
                    }


                </div>

                <hr className="shareHr" />


                {filePost && (
                    <div className="shareImgContainer">
                        {filePost.name.includes('.mp4') ?

                            <>
                                <ReactPlayer width='100%' height='100%' controls={true} url={URL.createObjectURL(filePost)} />
                            </>


                            :
                            <>
                                <img className="shareImg" src={URL.createObjectURL(filePost)} alt="" />
                                <Cancel className="shareCancelImg" onClick={() => setFilePost(null)} />
                            </>


                        }

                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">

                            {(!comments && change) ? (
                                <>
                                    <label htmlFor="file-upload" className="shareOption">
                                        <PermMedia htmlColor='tomato' className='shareIcon' />
                                        <span className='shareOptionText'>Photo or Video</span>
                                        <input style={{ display: "none" }} id="file-upload" type="file" onChange={(e) => setFilePost(e.target.files[0])} />
                                    </label>

                                </>

                            ) : (!comments && !change) ?
                                <>
                                    <PermMedia htmlColor='tomato' className='shareIcon' />
                                    <span className='shareOptionText'>Photo or Video</span>
                                    <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg,.mp4" onChange={(e) => setFilePost(e.target.files[0])} />
                                </> :
                                <></>

                            }

                        </label>
                    </div>
                    <button className='shareButton' type="submit"> Share </button>
                </form>
            </div>
        </div>
    )
}

export default Share;