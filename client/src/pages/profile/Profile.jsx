import React, { useState , useEffect } from 'react';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/center/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import { GetProfileUser } from '../../services/GetUser';
import './profile.css'



const Profile = () => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER;
    const [user, setUser] = useState({});


    useEffect(() => {
        (async () => {
            const res = await GetProfileUser()
            setUser(res.data)
        })()
    }, [])

    return (
        <>
            <Topbar />
            <div className="profile">
                <Leftbar />
                <div className="profileRight">
                    <div className="profileRightTop">
                    </div>
                    <div className="profileRightBottom">
                        <Rightbar profile />
                        <Feed username="egor" />

                    </div>
                </div>
            </div>
        </>


    )
}

export default Profile;