import React, { useState, useEffect } from 'react';
import './conversation.css'
import { GetUserById } from '../../services/userApi';


const Conversation = ({ conversation, currentUser, onlineUsers }) => {

    const [user, setUser] = useState(null)
    const [online, setOnline] = useState(false)


    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const friendId = conversation.members.find(member => member !== currentUser._id)

        setOnline(false)
        onlineUsers.includes(conversation.members[0]) && (onlineUsers.includes(conversation.members[1])) && (
            setOnline(true)
        )

        const getUser = async () => {
            try {
                const res = await GetUserById(friendId);
                setUser(res)
            } catch (err) {
            }

        }
        getUser();
    }, [currentUser, conversation , onlineUsers])


    return (
        <div className='conversation'>
            <div className="chatOnlineImgContainer">
                <img
                    className="chatOnlineImg"
                    src={
                        user?.profilePicture
                            ? PUBLIC_FOLDER + user.profilePicture
                            : PUBLIC_FOLDER + "person/noAvatar.png"
                    }
                    alt=""
                />
                {online ? <div className="chatOnlineBadge"></div>  : <></>}
            </div>
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}

export default Conversation;