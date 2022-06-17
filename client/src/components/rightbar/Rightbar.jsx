import "./rightbar.css";
import { useEffect } from "react";
import { useState , useRef} from "react";
import { FriendsList } from "../friendList/FriendList";
import { followersListUser, followingsListUser, friendsListUser } from "../../services/friendsApi";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import { followUser, unfollowUser } from "../../services/friendsApi";
import { FollowUser, UnfollowUser } from "../../actions/userAction"
import { useNavigate } from "react-router-dom";
import { addFriend, removeFriend } from "../../services/friendsApi";
import { AddFriend, RemoveFriend } from "../../actions/userAction";
import { FriendsClick } from "../../actions/clickedAction";
import { newConversation } from "../../services/conversationsApi";
import { AddUserToChat } from "../../actions/chatAction";
import {io} from 'socket.io-client'
import { AddRefresh } from "../../actions/refreshesAction";


export default function Rightbar({ user }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false)
  const [isFriended, setIsFriended] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { user: currentUser } = useSelector(state => state.userReducer)
  const navigate = useNavigate()
  const socket = useRef();
  const { amountRefreshes } = useSelector(state => state.refreshesReducer)


  useEffect(() => {
    socket.current = io("ws://localhost:8900");

}, [socket]);

useEffect(() => {

  socket.current.on("refreshPosts", amountRefreshes => {
      dispatch(AddRefresh())

  })


  //socket.disconnect();

}, [socket, dispatch])



  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser.followings, user, amountRefreshes]);

  useEffect(() => {
    setIsFriended(currentUser.friends.includes(user?._id))
  }, [currentUser.friends, user , amountRefreshes]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const followerList = await followersListUser(user._id)
        setFollowers(followerList.data);

      } catch (err) {

      }
    };
    getFollowers();
  }, [user, isSubscribed, isFriended, followed , amountRefreshes]);


  useEffect(() => {
    const getFollowings = async () => {
      try {
        const followingList = await followingsListUser(user._id)
        setFollowings(followingList.data);
      } catch (err) {
      }
    };
    getFollowings();
  }, [user, isSubscribed, isFriended, followed, amountRefreshes]);


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await friendsListUser(user._id)
        setFriends(friendsList.data);
      } catch (err) {
      }
    };
    getFriends();
  }, [user, isSubscribed, isFriended, followed, amountRefreshes]);




  useEffect(() => {
    const userFollowed = followers.find(follower => follower._id === currentUser._id)
    const userFriended = friends.find(follower => follower._id === currentUser._id)
    if (userFriended || userFollowed) {
      setIsSubscribed(true)
    }

    else
      setIsSubscribed(false)
  }, [isSubscribed, followers, friends, currentUser._id, amountRefreshes]);


  const navigateClick = () => {
    navigate('/editing');
  }

  const handleClick = async () => {
    try {
      if (followed) {
        await unfollowUser(user._id, currentUser._id)
        dispatch(UnfollowUser(user._id));
        localStorage.setItem("user", JSON.stringify({
          ...currentUser,
          followings: currentUser.followings.filter(
            (following) => following !== user._id
          ),
        }))
      } else {
        await followUser(user._id, currentUser._id)
        dispatch(FollowUser(user._id));
        localStorage.setItem("user", JSON.stringify({
          ...currentUser,
          followings: [...currentUser.followings, user._id]
        }))
      }
      dispatch(AddRefresh())
      socket.current.emit("refreshPost");
      setFollowed(!followed);
    } catch (err) {
    }
  }


  const addFriendClick = async () => {
    try {
      if (isFriended) {
        await removeFriend(user._id, currentUser._id)
        dispatch(RemoveFriend(user._id));
        localStorage.setItem("user", JSON.stringify({
          ...currentUser,
          friends: currentUser.friends.filter(
            (friend) => friend !== user._id
          ),
          followers: [...currentUser.followers, user._id],
        }))
      } else {
        await addFriend(user._id, currentUser._id)
        dispatch(AddFriend(user._id));
        localStorage.setItem("user", JSON.stringify({
          ...currentUser,
          followers: currentUser.followers.filter(
            (following) => following !== user._id
          ),
          friends: [...currentUser.friends, user._id],
        }))
      }
      dispatch(AddRefresh())
      socket.current.emit("refreshPost");
      dispatch(FriendsClick())
      setIsFriended(!isFriended);
    } catch (err) {
    }
  }


  const addConversationClick = async (e) => {
    e.preventDefault();
    const members = {
      senderId: currentUser._id,
      receiverId : user._id,
    };
    dispatch(AddUserToChat(user._id));
    await newConversation(members)
    navigate('/messenger' , members);
  }


  const HomeRightbar = () => {
    return (
      <>
      </>
    );
  };




  const ProfileRightbar = () => {
    return (
      <>

        <div className="profileContainer">
          <img
            className="profilePageTitle"
            src={user.profilePicture
              ? PUBLIC_FOLDER + user.profilePicture
              : PUBLIC_FOLDER + "person/noAvatar.png"}
            alt=""
          />
          {

          }

          {user.username !== currentUser.username && (
            <div className="rightbarContainerButton">
              <button className="rightbarSendMessageButton" onClick={addConversationClick}>
                Send message
              </button>
            </div>

          )}


          {user.username !== currentUser.username && (
            isSubscribed ?
              <div className="rightbarContainerButton">
                <button className="rightbarFollowButton" onClick={addFriendClick}>
                  {isFriended ? "Remove from friends" : "Add friend"}
                  {isFriended ? <Remove /> : <Add />}
                </button>
              </div> :
              <div className="rightbarContainerButton">
                <button className="rightbarFollowButton" onClick={handleClick}>
                  {followed ? "Unfollow" : "Follow"}
                  {followed ? <Remove /> : <Add />}
                </button>
              </div>

          )}
          {user.username === currentUser.username && (
            <div className="rightbarContainerButton">
              <button className="rightbarFollowButton" onClick={navigateClick}>
                Change Data
              </button>
            </div>

          )}




          <h4 className="rightbarTitleUsername">{user.username}</h4>
          <hr className="rightbarHr" />
          <h4 className="rightbarTitle">User information</h4>
          <div className="rightbarInfo">
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">City:</span>
              <span className="rightbarInfoValue">{user.city}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Country:</span>
              <span className="rightbarInfoValue">{user.country}</span>
            </div>
          </div>
          <hr className="rightbarHr" />

          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend, index) => (
              <FriendsList key={friend._id} friend={friend} />

            ))}
          </div>


          <h4 className="rightbarTitle">User subscribes</h4>
          <div className="rightbarFollowings">
            {followers.map((friend, index) => (
              <FriendsList key={friend._id} friend={friend} />

            ))}
          </div>
          <h4 className="rightbarTitle">User subscribers</h4>
          <div className="rightbarFollowings">
            {followings.map((friend, index) => (
              <FriendsList key={friend._id} friend={friend} />

            ))}
          </div>


        </div>

      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {user ? <ProfileRightbar /> : <HomeRightbar />}
      </div>
    </div>
  );
}