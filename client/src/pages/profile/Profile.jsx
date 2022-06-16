import React, { useState, useEffect } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/center/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import { GetProfileUser } from '../../services/userApi';
import './profile.css';
import { useParams } from 'react-router'
import LockIcon from '@mui/icons-material/Lock';
import { useSelector } from 'react-redux';



const Profile = () => {
    const [user, setUser] = useState({});
    const { user: currentUser } = useSelector(state => state.userReducer)
    const username = useParams().username;

    const { friendsClick } = useSelector(state => state.clickedReducer)

    useEffect(() => {
        (async () => {
            const res = await GetProfileUser(username)
            setUser(res.data)
        })()
    }, [username, friendsClick])


    return (
        <>
            <Topbar />
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