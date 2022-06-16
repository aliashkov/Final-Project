import React, { useState } from 'react';
import "./topbar.css"
import { Search, Chat } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AllPosts, FriendsPosts, NulifyPosts } from '../../actions/isAllPostsAction';
import { useEffect } from 'react';
import { GetUsers } from '../../services/userApi';
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

    const friendsPostsClick = (e) => {
        e.preventDefault()
        dispatch(FriendsPosts())
        dispatch(NulifyPosts())
    }

    const allPostsClick = (e) => {
        e.preventDefault()
        dispatch(AllPosts())
        dispatch(NulifyPosts())
    }


    const logoutClick = (e) =>{
        e.preventDefault()
        localStorage.setItem("user", null)
        navigate('/login');
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
                        <Filter hiddenString={hiddenSearch} key={findUser._id} findUser={findUser} />
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
                        <Chat />

                    </div>

                    <div className="topbarIconItem">

                        <LogoutIcon onClick={logoutClick}/>


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