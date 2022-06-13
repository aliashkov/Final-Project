import React, { useEffect, useState } from 'react';
import './message.css'
import { format } from 'timeago.js'
import { GetUserById } from '../../services/userApi';

const Message = ({ message, own }) => {

    const [user, setUser] = useState(null)

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {

        const getUser = async () => {
            try {
                const res = await GetUserById(message.sender);
                console.log(res)
                setUser(res)
            } catch (err) {
                console.log(err)
            }

        }
        getUser();
    }, [message])


    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">

                <img className="messageImg" src={user?.profilePicture ? PUBLIC_FOLDER + user?.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                <p className="messageText"> {message.text}</p>
            </div>
            <div className="messageBottom"> {format(message.createdAt)}</div>
        </div>
    );
}

export default Message;