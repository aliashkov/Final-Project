import React from 'react';
import './yourFriends.css'
import { GetUserById } from '../../services/userApi';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const YourFriends = ({ userId }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    const [findUser, setFindUser] = useState([])

    useEffect(() => {
        (async () => {
            const findUser = await GetUserById(userId)
            setFindUser(findUser)

        })()

    }, [userId])

    return (

        <Link
            to={"/profile/" + findUser.username}
            style={{ textDecoration: "none", color: "black" }}
        >

            <li className="sidebarFriend">
                <img className="sidebarFriendImg" src={findUser.profilePicture ? PUBLIC_FOLDER + findUser.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" />
                <span className="sidebarFriendPicture"> {findUser.username}</span>
            </li>
        </Link>

    )
}

export default YourFriends;