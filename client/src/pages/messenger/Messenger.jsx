import React, { useEffect, useState, useRef } from 'react';
import ChatOnline from '../../components/chatOnline/ChatOnline';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import './messenger.css'
import { useSelector } from 'react-redux';
import { GetConversations } from '../../services/conversationsApi';
import { GetMessages, SendMessage } from '../../services/messagesApi';
import { io } from 'socket.io-client'



const Messenger = () => {

    const { user } = useSelector(state => state.userReducer)

    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const socket = useRef(io("ws://localhost:8900"))
    const scrollRef = useRef()


    useEffect(() => {
        socket.current = io("ws://localhost:8900")
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
              sender: data.senderId,
              text: data.text,
              createdAt: Date.now(),
            });
        });
    }, [])

    useEffect(() => {
        arrivalMessage &&
          currentChat?.members.includes(arrivalMessage.sender) &&
          setMessages((prev) => [...prev, arrivalMessage]);
      }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            console.log(users)
        })
    }, [user])

    useEffect(() => {
        (async () => {
            try {
                const res = await GetConversations(user._id)
                setConversations(res)
            } catch (err) {
                console.log(err)
            }

        })()
    }, [user._id])



    useEffect(() => {
        (async () => {
            try {
                const res = await GetMessages(currentChat?._id)
                setMessages(res)
            } catch (err) {
                console.log(err)
            }

        })()
    }, [currentChat])

    useEffect(() => {
        
    })

    const handleSubmit = async (e) => {
        e.preventDefault()
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id
        }

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
          );
      
          socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage,
          });

        try {
            const res = await SendMessage(message)
            setMessages([...messages, res.data])
            setNewMessage("")

        } catch (err) {
            console.log(err)
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder='Search for friends' className='chatMenuInput'></input>
                        {conversations.map((conversation) => (
                            <div key={conversation._id} onClick={() => setCurrentChat(conversation)}>
                                <Conversation conversation={conversation} currentUser={user} />
                            </div>

                        ))}

                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxwrapper">
                        {currentChat ?
                            <>
                                <div className="chatBoxTop">
                                    {messages.map(message => (
                                        <div key={message._id} ref={scrollRef}>
                                            <Message message={message} own={message.sender === user._id} />
                                        </div>

                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className='chatMessageInput'
                                        placeholder='write something ...'
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage}
                                    ></textarea>
                                    <button className='chatSubmitButton' onClick={handleSubmit}> Send </button>
                                </div>
                            </> : <span className='noConversationText'>Open a conversation to start a chat</span>}
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