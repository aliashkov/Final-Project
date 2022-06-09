import React from 'react';
import './chatOnline.css'


const ChatOnline = () => {

    return (
        <div className='chatOnline'>
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                    <img className="chatOnlineImg" src="https://avatanplus.com/files/resources/original/5790e2c1d91d61560df5c561.png" alt="" />
                    <div className="chatOnlineBadge"></div>
                </div>
                <span className="chatOnlineName">Artyom Liashkou</span>
            </div>
        </div>
    );
}

export default ChatOnline;