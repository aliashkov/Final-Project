import React, { useEffect, useState, useRef } from 'react';
import Conversation from '../../components/conversations/Conversation';
import Message from '../../components/message/Message';
import Topbar from '../../components/topbar/Topbar';
import './messenger.css'
import { useSelector } from 'react-redux';
import { GetConversations } from '../../services/conversationsApi';
import { GetMessages, SendMessage } from '../../services/messagesApi';
import { io } from 'socket.io-client'
import { GetUserById } from '../../services/userApi';
import { AmountAddedPosts } from '../../actions/isAllPostsAction';
import { useDispatch } from 'react-redux';
import { removeUserFromChat } from "../../actions/chatAction";
import ChatOnline from '../../components/chatOnline/ChatOnline'


const Messenger = ({ members }) => {

    const { user } = useSelector(state => state.userReducer)
    const { member } = useSelector(state => state.chatReducer)
    const { amountAddedPosts } = useSelector(state => state.isAllPostsReducer)
    const [conversations, setConversations] = useState([])
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState(null)
    const [newMessage, setNewMessage] = useState("")
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef();
    const scrollRef = useRef()
    const [searchUser, setSearchUser] = useState("")
    const [searchRes, setSearchRes] = useState([])
    const [friends, setFriends] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        socket.current = io("ws://localhost:8900");
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);

    useEffect(() => {
        socket.current.on("refreshPosts", amountRefreshes => {
            dispatch(AmountAddedPosts())
        })
    }, [user, amountAddedPosts, dispatch])


    useEffect(() => {
        conversations?.map((conversation) => {
            if (member !== null) {
                if ((conversation.members[0].includes(member)) && (conversation.members[1].includes(user?._id))) {
                    setCurrentChat(conversation)
                    dispatch(AmountAddedPosts())
                    dispatch(removeUserFromChat());
                }
                else if ((conversation.members[1].includes(member)) && (conversation.members[0].includes(user?._id))) {
                    setCurrentChat(conversation)
                    dispatch(AmountAddedPosts())
                    dispatch(removeUserFromChat());
                }
            }

        })
    }, [member, conversations, user?._id, dispatch]);




    useEffect(() => {
        arrivalMessage &&
            currentChat?.members.includes(arrivalMessage.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);

    useEffect(() => {
        socket.current.emit("addUser", user._id)
        socket.current.on("getUsers", users => {
            setOnlineUsers([...users.map(user => user.userId)])
        })
    }, [user])

    useEffect(() => {
        (async () => {
            try {

                const res = await GetConversations(user._id)
                setConversations(res.sort((post1, post2) => {
                    return new Date(post2.updatedAt) - new Date(post1.updatedAt)
                }));

                setFriends([])
                setSearchRes([])

                let result = await Promise.all(res.map((conversation) => {
                    const friendId = conversation.members.find(member => member !== user._id)
                    return setFriends((prev) => [...prev, friendId])
                }))

                result = friends;

                const searchedRes = await Promise.all(result.map(async (friend, index) => {
                    const user = await GetUserById(friend)
                    if (user.username.toLowerCase().includes(searchUser.toLowerCase())) {
                        return user
                    } else {

                    }
                }));

                setSearchRes(searchedRes)

            } catch (err) {
            }

        })()
    }, [user, searchUser, amountAddedPosts])


    useEffect(() => {
        (async () => {
            try {
                const res = await GetMessages(currentChat?._id)
                setMessages(res)
            } catch (err) {
            }

        })()
    }, [currentChat, amountAddedPosts])

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

        socket.current.emit("refreshPost");

        try {
            const res = await SendMessage(message)
            dispatch(AmountAddedPosts())
            setMessages([...messages, res.data])
            setNewMessage("")

        } catch (err) {
        }
    }

    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages])

    const currentChatClick = (conversation) => {
        setCurrentChat(conversation)
        setSearchUser("")
    }


    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input
                            value={searchUser}
                            onChange={e => setSearchUser(e.target.value)}
                            placeholder='Search user'
                            className='chatMenuInput'
                        ></input>
                        {conversations.map((conversation, index) => (
                            ((searchRes[index] !== undefined) || (searchUser === "")) && (
                                < div key={conversation._id} onClick={() => currentChatClick(conversation)}>
                                    <Conversation onlineUsers={onlineUsers} conversation={conversation} currentUser={user} />
                                </div>
                            )

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

                                            <Message message={message} own={message.sender === user._id} socket={socket} />
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

                    </div>
                </div>
            </div>
        </>
    );
}

export default Messenger;