import React from 'react';
import './leftbar.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { Chat, PlayCircleFilledOutlined, Group, Bookmark, HelpOutline, WorkOutline, Event, School } from '@mui/icons-material';
import { Users } from '../../data';
import YourFriends from '../yourFriends/YourFriends';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';


const Leftbar = () => {
    const { user } = useSelector(state => state.userReducer)



    return (
        <div className='leftbar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">

                            <Link to='/'  className='sidebarListLink' style={{ textDecoration: "none" , color: "black"  }}>
                                <PersonOutlineIcon className='sidebarIcon' />
                                <span className="sidebarListItemText">Feed</span>
                            </Link>

                    </li>
                    <li className="sidebarListItem">
                        <Link to='/messenger'  className='sidebarListLink' style={{ textDecoration: "none" , color: "black"  }}>
                            <Chat className="sidebarIcon" />
                            <span className="sidebarListItemText">Chats</span>
                        </Link>

                    </li>
                    <li className="sidebarListItem">
                        <div className='sidebarListLink'>
                            <PlayCircleFilledOutlined className="sidebarIcon" />
                            <span className="sidebarListItemText">Videos</span>
                        </div>

                    </li>
                    <li className="sidebarListItem">
                        <div className='sidebarListLink'>
                            <Group className="sidebarIcon" />
                            <span className="sidebarListItemText">Groups</span>
                        </div>

                    </li>
                    <li className="sidebarListItem">
                        <div className='sidebarListLink'>
                            <Bookmark className="sidebarIcon" />
                            <span className="sidebarListItemText">Bookmarks</span>
                        </div>

                    </li>
                    <li className="sidebarListItem">
                        <div className='sidebarListLink'>
                            <HelpOutline className="sidebarIcon" />
                            <span className="sidebarListItemText">Questions</span>
                        </div>

                    </li>
                    <li className="sidebarListItem">
                        <div className='sidebarListLink'>
                            <WorkOutline className="sidebarIcon" />
                            <span className="sidebarListItemText">Jobs</span>
                        </div>

                    </li>
                    <li className="sidebarListItem">
                        <div className='sidebarListLink'>
                            <Event className="sidebarIcon" />
                            <span className="sidebarListItemText">Events</span>
                        </div>

                    </li>
                    <li className="sidebarListItem">
                        <div className='sidebarListLink'>
                            <School className="sidebarIcon" />
                            <span className="sidebarListItemText">Courses</span>
                        </div>

                    </li>
                </ul>
                <hr className='sidebarHr' />
                <ul className="sidebarFriendList">
                    {user.friends.map(u => (
                        <YourFriends key={u} userId={u} />
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Leftbar;