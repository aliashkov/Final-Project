import React, { useState, useEffect } from 'react';
import './conversation.css'
import { GetUserById } from '../../services/userApi';


const Conversation = ({ conversation, currentUser }) => {

    const [user, setUser] = useState(null)

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        const friendId = conversation.members.find(member => member !== currentUser._id)

        const getUser = async () => {
            try {
                const res = await GetUserById(friendId);
                setUser(res)
            } catch (err) {
            }

        }
        getUser();
    }, [currentUser, conversation])


    return (
        <div className='conversation'>
            <img className='conversationImg' src={user?.profilePicture ? PUBLIC_FOLDER + user?.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}

export default Conversation;