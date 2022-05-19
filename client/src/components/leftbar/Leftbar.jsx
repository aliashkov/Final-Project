import React from 'react';
import './leftbar.css'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import {
    RssFeed,
    Chat,
    PlayCircleFilledOutlined,
    Group,
    Bookmark,
    HelpOutline,
    WorkOutline,
    Event,
    School,
} from '@mui/icons-material';


const Leftbar = () => {
    return (
        <div className='leftbar'>
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <PersonOutlineIcon className='sidebarIcon' />
                        <span className="sidebarListItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className="sidebarIcon" />
                        <span className="sidebarListItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className="sidebarIcon" />
                        <span className="sidebarListItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className="sidebarIcon" />
                        <span className="sidebarListItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className="sidebarIcon" />
                        <span className="sidebarListItemText">Bookmarks</span>
                    </li>
                    <li className="sidebarListItem">
                        <HelpOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className="sidebarIcon" />
                        <span className="sidebarListItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className="sidebarIcon" />
                        <span className="sidebarListItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className="sidebarIcon" />
                        <span className="sidebarListItemText">Courses</span>
                    </li>
                </ul>
                <hr className='sidebarHr'/>
                <ul className="sidebarFriendList">
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    <li className="sidebarFriend">
                        <img className="sidebarFriendImg" src="/assets/person/2.jpg" alt="" />
                        <span className="sidebarFriendPicture"> Artyom Liashkou</span>
                    </li>
                    
                </ul>
            </div>
        </div>
    )
}

export default Leftbar;