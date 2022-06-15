import React, { useEffect, useState, useRef } from 'react';
import './message.css'
import { format } from 'timeago.js'
import { GetUserById } from '../../services/userApi';
import DeleteIcon from '@mui/icons-material/Delete';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import { deleteComment } from '../../services/commentsApi';
import { useSelector } from 'react-redux';
import { deleteMessage , updateMessage } from '../../services/messagesApi';
import { useDispatch } from 'react-redux';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import { io } from 'socket.io-client'

const Message = ({ message, own, socket }) => {

    const [user, setUser] = useState(null)
    const dispatch = useDispatch()
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    const { user: currentUser } = useSelector(state => state.userReducer)
    const [clicked, setClicked] = useState(false)
    const [newMessage, setNewMessage] = useState("")

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await GetUserById(message.sender);
                setUser(res)
            } catch (err) {
            }

        }
        getUser();
    }, [message])



    const deleteMessageClick = (e) => {
        (async () => {
            try {
                await deleteMessage(message._id, currentUser._id, currentUser.isAdmin)
                dispatch(AmountAddedPosts())
                socket.current.emit("refreshPost");
            } catch (err) { }

        })()

    }

    const editMessageClick = (e) => {
        (async () => {
            try {
                setClicked(!clicked)
            } catch (err) { }

        })()

    }


    const handleSubmit = async (e) => {
        e.preventDefault()
        
        try {
            if (newMessage.length > 0) {
                await updateMessage(message._id, currentUser._id, newMessage, currentUser.isAdmin)
                dispatch(AmountAddedPosts())
                socket.current.emit("refreshPost");
                setClicked(!clicked)
            }
            else {
                alert("Input something before sending")
            }

 
        } catch (err) {
            
        }
    }



    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                {(!clicked) ?
                    <>
                        <img className="messageImg" src={user?.profilePicture ? PUBLIC_FOLDER + user?.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                        <p className="messageText ow-anywhere"> {message.text}
                        </p>
                    </>

                    : <>
                        <div className="messageEditBoxBottom">
                            <textarea
                                className='messageEditChatInput'
                                placeholder='write something ...'
                                onChange={(e) => setNewMessage(e.target.value)}
                                value={newMessage}
                            ></textarea>
                            <button className='messageChatButton' onClick={handleSubmit}> Send </button>
                        </div>
                    </>}
                {own ?
                    <div className='messageSettings'>
                        <ModeEditIcon onClick={editMessageClick} />
                        <DeleteIcon onClick={deleteMessageClick} />
                    </div>
                    :
                    <></>
                }
            </div>

            <div className="messageBottom"> {format(message.createdAt)}</div>
        </div>
    );
}

export default Message;