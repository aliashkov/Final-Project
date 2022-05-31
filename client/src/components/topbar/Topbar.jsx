import React, { useState } from 'react';
import "./topbar.css"
import { Search, Person, Chat, Notifications } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AllPosts, FriendsPosts } from '../../actions/isAllPostsAction';
import { changeFilterPosts } from '../../actions/findPostsAction';
import { useEffect } from 'react';
import { GetUsers } from '../../services/userApi';
import { MoreVert } from '@mui/icons-material';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { Filter } from '../filter/Filter';


const Topbar = () => {
    const { user } = useSelector(state => state.userReducer)
    const { isAllPosts } = useSelector(state => state.isAllPostsReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchUser, setSearchUser] = useState("")


    const [users, setUsers] = useState([])

    useEffect(() => {
        (async () => {
            const allUsers = await GetUsers()
            setUsers([...allUsers].filter(user => user.username.toLowerCase().includes(searchUser.toLowerCase())))

        })()

    }, [searchUser])


    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    const friendsPostsClick = () => {
        dispatch(FriendsPosts())
    }

    const allPostsClick = () => {
        dispatch(AllPosts())
    }

    const hiddenSearch = () => {
        setSearchUser("");
        setUsers([])
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
                        value={searchUser}
                        onChange={e => setSearchUser(e.target.value)}
                        placeholder="Search User"
                        className="searchInput"
                    />
                </div>
            </div>

             
            <div className="usersList">
                {searchUser !== "" ?
                    
                    users.slice(0, 5).map((findUser, index) => (
                       <Filter hiddenString={hiddenSearch} key={findUser._id}  findUser={findUser} />
                    ))
                : <></>}
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                    {isAllPosts ?
                        <>
                            <span className="topbarLink" style={{ color: "red" }} onClick={allPostsClick}>All Posts</span>
                            <span className="topbarLink" style={{ color: "white" }} onClick={friendsPostsClick}>Friend Posts</span>
                        </>
                        :
                        <>
                            <span className="topbarLink" style={{ color: "white" }} onClick={allPostsClick}>All Posts</span>
                            <span className="topbarLink" style={{ color: "red" }} onClick={friendsPostsClick}>Friend Posts</span>
                        </>
                    }
                </div>
                <div className="topbarIcons">

                    <div className="topbarIconItem">
                        <Link to={`/login`} style={{ textDecoration: "none", color: "white" }}>
                            <LogoutIcon />
                        </Link>

                    </div>

                    <div className="topbarIconItem">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="topbarImg" />
                        </Link>

                    </div>

                </div>


            </div>
        </div>
    )
}

export default Topbar;