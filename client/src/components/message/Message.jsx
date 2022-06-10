import React from 'react';
import './message.css'
import {format} from 'timeago.js'

const Message = ({message, own}) => {

    return (
        <div className={own ? "message own" : "message"}>
            <div className="messageTop">
                
                <img className="messageImg" src="https://avatanplus.com/files/resources/original/5790e2c1d91d61560df5c561.png" alt="" />
                <p className="messageText"> {message.text}</p>
            </div>
            <div className="messageBottom"> {format(message.createdAt)}</div>
        </div>
    );
}

export default Message;