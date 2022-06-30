import React, { useState } from 'react';
import "./topbar.css"
import { Search, Notifications } from '@mui/icons-material'
import { Link } from "react-router-dom"
import { useSelector, useDispatch } from 'react-redux';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import { AllPosts, FriendsPosts, NulifyPosts } from '../../actions/isAllPostsAction';
import { useEffect } from 'react';
import { GetUsers } from '../../services/userApi';
import { Filter } from '../filter/Filter';
import { reloadPage } from '../../actions/reloadAction';
import { GetNotifications, DeleteNotifications } from '../../services/notificationsApi';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import FolderIcon from '@mui/icons-material/Folder';
import FolderSharedIcon from '@mui/icons-material/FolderShared';
import HomeIcon from '@mui/icons-material/Home';



const Topbar = () => {
    const { user } = useSelector(state => state.userReducer)
    const { isAllPosts } = useSelector(state => state.isAllPostsReducer)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [searchUser, setSearchUser] = useState("")
    const [users, setUsers] = useState([])
    const { amountAddedPosts } = useSelector(state => state.isAllPostsReducer)
    const { amountRefreshes } = useSelector(state => state.refreshesReducer)
    const [notifications, setNotifications] = useState([]);
    const [open, setOpen] = useState(false);
    const [matches, setMatches] = useState(
        window.matchMedia("(min-width: 868px)").matches
    )

    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    useEffect(() => {
        (async () => {
            const notifications = await GetNotifications(user._id)
            setNotifications(notifications)

        })()

    }, [amountAddedPosts, user._id, amountRefreshes])


    const displayNotification = (n) => {

        return (
            <span key={n._id} className="notification">{`${n.sender} ${n.type} .`}</span>
        );
    };

    const handleRead = async (e) => {
        e.preventDefault()
        await DeleteNotifications(user._id)
        dispatch(AmountAddedPosts())
        setOpen(false);
    }



    useEffect(() => {
        (async () => {
            const allUsers = await GetUsers()
            setUsers([...allUsers].filter(user => user.username.toLowerCase().includes(searchUser.toLowerCase())))

        })()

    }, [searchUser])

    useEffect(() => {
        window
            .matchMedia("(min-width: 868px)")
            .addEventListener('change', e => setMatches(e.matches));
    }, []);




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


    const logoutClick = (e) => {
        e.preventDefault()
        localStorage.setItem("user", null)
        dispatch(reloadPage())
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

                    {matches ?
                        <span className="logo">Social Media</span>
                        :
                        <HomeIcon className="logo home"/>
                    }

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

                    users.slice(0, 5).map((findUser) => (
                        <Filter hiddenString={hiddenSearch} key={findUser._id} findUser={findUser} />
                    ))
                    : <></>}
            </div>

            <div className="topbarRight">
                <div className="topbarLinks">
                    {isAllPosts ?
                        <>

                            {matches ?
                                <>
                                    <span className="topbarLink" style={{ color: "red" }} onClick={allPostsClick}>All Posts</span>
                                    <span className="topbarLink" style={{ color: "white" }} onClick={friendsPostsClick}>Friend Posts</span>
                                </>
                                :
                                <div className='topbarPanelPosts'>
                                    <FolderIcon className="topbarLink topbarIcon" style={{ color: "red" }} onClick={allPostsClick} />
                                    <FolderSharedIcon className="topbarLink topbarIcon" onClick={friendsPostsClick} />
                                </div>
                            }

                        </>
                        :
                        <>
                            {matches ?
                                <>

                                    <span className="topbarLink" style={{ color: "white" }} onClick={allPostsClick}>All Posts</span>
                                    <span className="topbarLink" style={{ color: "red" }} onClick={friendsPostsClick}>Friend Posts</span>
                                </>
                                :
                                <div className='topbarPanelPosts'>
                                    <FolderIcon className="topbarLink topbarIcon" onClick={allPostsClick} />
                                    <FolderSharedIcon className="topbarLink topbarIcon" style={{ color: "red" }} onClick={friendsPostsClick} />
                                </div>
                            }

                        </>
                    }
                </div>
                <div className="topbarIcons">

                    <div className="topbarIconItem" onClick={() => setOpen(!open)}>
                        <Notifications />
                        {
                            notifications.length > 0 &&
                            <span className="topbarIconBadge">{notifications.length}</span>
                        }

                    </div>

                    <div className="topbarIconItem">

                        <LogoutIcon onClick={logoutClick} />


                    </div>

                    <div className="topbarIconItem">
                        <Link to={`/profile/${user.username}`}>
                            <img src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"} alt="" className="topbarImg" />
                        </Link>

                    </div>

                </div>
                {open && notifications.length > 0 && (
                    <div className="notifications">
                        {notifications.slice(-5).map((n, index) => displayNotification(n))}
                        <button className="nButton" onClick={handleRead}>
                            Mark as read
                        </button>
                    </div>
                )}


            </div>
        </div>
    )
}

export default Topbar;