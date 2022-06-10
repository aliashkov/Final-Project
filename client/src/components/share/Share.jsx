import React, { useState , useRef , useEffect } from 'react';
import './share.css'
import { PermMedia, Cancel } from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { UploadFile } from '../../services/uploadApi';
import { addPost } from '../../services/postsApi';
import { useDispatch } from 'react-redux';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import { changePost } from '../../services/postsApi';
import { addComment, changeComment } from '../../services/commentsApi';
import { NulifyClicks } from '../../actions/clickedAction';
import { io } from 'socket.io-client'



const Share = ({ postId, change, comments }) => {
    const { user } = useSelector(state => state.userReducer)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [file, setFile] = useState(null);
    const [description, setDescription] = useState("")
    const dispatch = useDispatch();
    const socket = useRef(io("ws://localhost:8900"))

    useEffect(() => {
        socket.current = io("ws://localhost:8900")
    }, [])

    useEffect(() => {
        socket.current.on("refreshPosts", amountRefreshes => {
            console.log(amountRefreshes)
            dispatch(AmountAddedPosts())
        })
    }, [user])


    const submitHandler = async (e) => {
        e.preventDefault();
        if (description !== "") {
            const newPost = {
                userId: user._id,
                description: description,
                isAdmin : user.isAdmin
            };
            const data = new FormData();
            if (file) {
                const fileName = Date.now() + file.name;
                data.append("name", fileName);
                data.append("file", file);
                newPost.img = fileName;
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
                    if (change)
                        await changeComment(postId, newPost)
                    else
                        await addComment(postId, newPost)
                }
                dispatch(NulifyClicks())
                dispatch(AmountAddedPosts())
                socket.current.emit("addPost");
                setFile(null)
                setDescription("")
                if (!comments) {
                    document.querySelector("#shareInputId").value = "";
                }
                else {
                    document.querySelector("#shareInputIdComments").value = "";
                }

                //window.location.reload()
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
                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">

                            {(!comments && change) ? (
                                <>
                                    <label htmlFor="file-upload" className="shareOption">
                                        <PermMedia htmlColor='tomato' className='shareIcon' />
                                        <span className='shareOptionText'>Photo</span>
                                        <input id="file-upload" type="file" onChange={(e) => setFile(e.target.files[0])} />
                                    </label>

                                </>

                            ) : (!comments && !change) ?
                                <>
                                    <PermMedia htmlColor='tomato' className='shareIcon' />
                                    <span className='shareOptionText'>Photo</span>
                                    <input style={{ display: "none" }} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e) => setFile(e.target.files[0])} />
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