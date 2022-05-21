import React from 'react';
import './friends.css'

const Friends = ({user}) => {
    return (
        <li className="rightbarFriend">
            <div className="rightbarProfileImgContainer">
                <img className="rightbarProfileImg" src={user.profilePicture} alt="" />
            </div>
            <span className="rightbarUsername">{user.username} </span>
        </li>


    )
}

export default Friends;


