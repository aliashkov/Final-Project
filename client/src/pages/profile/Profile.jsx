import React from 'react';
import Topbar from '../../components/topbar/Topbar';
import Feed from '../../components/center/Feed';
import Leftbar from '../../components/leftbar/Leftbar';
import Rightbar from '../../components/rightbar/Rightbar';
import './profile.css'



const Profile = () => {
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
                        <Feed />
                        
                    </div>
                </div>
            </div>
        </>


    )
}

export default Profile;