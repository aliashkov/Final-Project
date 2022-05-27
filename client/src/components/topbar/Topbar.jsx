import React from 'react';
import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { useSelector } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';

const Topbar = () => {
    const { user } = useSelector(state => state.userReducer)
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
    console.log(user)

    const loginClick = () => {
        console.log(777)
    }


    return (
        <div className="topbarContainer">
            <div className="topbarLeft">
                <Link to='/' style={{ textDecoration: "none" }}>
                    <span className="logo">Social Media</span>
                </Link>

            </div>
            <div className="topbarCenter">
                <div className="searchbar">
                    <Search className="searchIcon" />
                    <input
                        placeholder="Search for friend, post or video"
                        className="searchInput"
                    />
                </div>
            </div>
            <div className="topbarRight">
                <div className="topbarLinks">
                    <span className="topbarLink">Homepage</span>
                    <span className="topbarLink">Timeline</span>
                </div>
                <div className="topbarIcons">
                    <div className="topbarIconItem">
                        <Link to={`/login`} style={{ textDecoration: "none", color : "white" }}>
                            <LogoutIcon  />
                        </Link>

                    </div>
                </div>
                <Link to={`/profile/${user.username}`}>
                    <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="topbarImg" />
                </Link>

            </div>
        </div>
    )
}

export default Topbar;