import React, { useState, useEffect, useRef } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/center/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import { GetProfileUser } from '../../services/userApi';
import './profile.css';
import { useParams } from 'react-router'
import LockIcon from '@mui/icons-material/Lock';
import { useSelector } from 'react-redux';
import {io} from 'socket.io-client'
import { useDispatch } from 'react-redux';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import { useNavigate } from 'react-router';



const Profile = () => {
    const [user, setUser] = useState({});
    const { user: currentUser } = useSelector(state => state.userReducer)
    let username = useParams().username;
    const dispatch = useDispatch()
    const socket = useRef();
    const { friendsClick } = useSelector(state => state.clickedReducer)
    const { amountAddedPosts } = useSelector(state => state.isAllPostsReducer)
    const navigate = useNavigate()
    console.log(user)
    console.log(currentUser)

    useEffect(() => {
        socket.current = io("ws://localhost:8900");

    }, [socket]);


    useEffect(() => {

        socket.current.on("refreshNames", data => {
            console.log(data)
            console.log(username)
             if (data.oldName === username) {
                username = data.newName
                navigate(`/profile/${data.newName}`);
             }
        })

    }, [socket, dispatch])



    useEffect(() => {
        (async () => {
            try {
                const res = await GetProfileUser(username)
                console.log(res)
                setUser(res.data)
            } catch(err) {
                navigate('/')
            }

        })()
    }, [username, friendsClick, currentUser.friends])


    return (
        <>
            <Topbar socket={socket}/>
            <div className="profile">
                <Leftbar />

                <div className="profileRight">
                    <div className="profileRightTop">
                    </div>
                    {(!user.isHidden || (user._id === currentUser._id) || user.friends.includes(currentUser._id)) ?
                        <div className="profileRightBottom">
                            <Rightbar user={user} />
                            <Feed username={username} />

                        </div>
                        :
                        <>
                            <div className="restrict">
                                <Rightbar user={user} />
                                <div className="restrictWrapper">
                                    <div className="restrictLeft">
                                        <span className="restrictLock">
                                            <LockIcon />
                                        </span>
                                        <h3 className="restrictLogo">This Account is private</h3>
                                        <span className="restrictDesc">
                                            Follow this account to see their posts
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </>}
                </div>


            </div>
        </>


    )
}

export default Profile;