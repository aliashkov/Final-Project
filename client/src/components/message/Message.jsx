import React from 'react';
import './message.css'


const Message = ({own}) => {

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                
                <img className="messageImg" src="https://avatanplus.com/files/resources/original/5790e2c1d91d61560df5c561.png" alt="" />
                <p className="messageText"> This is the message</p>
            </div>
            <div className="messageBottom"> 1 hour ago</div>
        </div>
    );
}

export default Message;