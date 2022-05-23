import React from 'react';
import './yourFriends.css'

const YourFriends = ({ user }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PUBLIC_FOLDER + user.profilePicture} alt="" />
            <span className="sidebarFriendPicture"> {user.username}</span>
        </li>


    )
}

export default YourFriends;