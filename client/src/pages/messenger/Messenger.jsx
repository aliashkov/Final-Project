import React, { useEffect, useState } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import './messenger.css'
import { useSelector } from 'react-redux';
import { GetConversations } from '../../services/conversationsApi';




const Messenger = () => {

    const { user } = useSelector(state => state.userReducer)

    const [conversations, setConversations] = useState([])

    useEffect(() => {
        (async () => {
            try {
                const res = await GetConversations(user._id)
                setConversations(res)
            } catch (err) {
                console.log(err)
            }

        })()
    }, [user])

    console.log(user)

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='Search for friends' className='chatMenuInput'></input>
                        {conversations.map((conversation) => (
                            <Conversation conversation={conversation} currentUser={user}/>
                        ))}
                        
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxwrapper">
                        <div className="chatBoxTop">
                            <Message />
                            <Message own={true} />
                            <Message />
                            <Message />
                            <Message own={true} />
                            <Message />
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className='chatMessageInput' placeholder='write something ...'></textarea>
                            <button className='chatSubmitButton'> Send </button>
                        </div>
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;