import React from 'react';
import './yourFriends.css'
import { GetUserById } from '../../services/userApi';
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import io from 'socket.io-client'

const YourFriends = ({ userId }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    const socket = useRef();
    const [onlineUsers, setOnlineUsers] = useState([])
    const { user } = useSelector(state => state.userReducer)
    const [findUser, setFindUser] = useState([])
    const [online, setOnline] = useState(false)

    useEffect(() => {

        (async () => {
            const findUser = await GetUserById(userId)
            setFindUser(findUser)

        })()

        setOnline(false)
        onlineUsers.includes(userId) && (
            setOnline(true)
        )

    }, [userId, onlineUsers])

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

    }, [socket]);


    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers([...users.map(user => user.userId)])
        })
    }, [user])


    return (

        <Link
            to={"/profile/" + findUser.username}
            style={{ textDecoration: "none", color: "black" }}
        >

            <li className="sidebarFriend">
                <div className="sidebarContainer">
                    <img className="sidebarFriendImg" src={findUser.profilePicture ? PUBLIC_FOLDER + findUser.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                    {online ? <div className="sidebarOnlineBadge"></div> : <></>}
                </div>

                <span className="sidebarFriendPicture"> {findUser.username}</span>
            </li>
        </Link>

    )
}

export default YourFriends;