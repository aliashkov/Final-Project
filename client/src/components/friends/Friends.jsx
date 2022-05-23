import React from 'react';
import './friends.css'

const Friends = ({user}) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={PUBLIC_FOLDER + user.profilePicture} alt="" />
            </div>
            <span className="rightbarUsername">{user.username} </span>
        </li>


    )
}

export default Friends;


