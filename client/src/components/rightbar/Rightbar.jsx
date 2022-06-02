import "./rightbar.css";
import { Users } from "../../data";
import Friends from "../friends/Friends";
import { useEffect } from "react";
import { useState } from "react";
import { FriendsList } from "../friendList/FriendList";
import { followersListUser, followingsListUser, friendsListUser } from "../../services/friendsApi";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import { followUser, unfollowUser } from "../../services/friendsApi";
import { FollowUser, UnfollowUser } from "../../actions/userAction"
import { useNavigate } from "react-router-dom";
import { addFriend } from "../../services/friendsApi";
import { AddFriend } from "../../actions/userAction";


export default function Rightbar({ user }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const [followers, setFollowers] = useState([])
  const [followings, setFollowings] = useState([])
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false)
  const [isSubscribed, setIsSubscribed] = useState(false)
  const { user: currentUser } = useSelector(state => state.userReducer)
  const navigate = useNavigate()

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [currentUser.followings, user]);

  useEffect(() => {
    const getFollowers = async () => {
      try {
        const followerList = await followersListUser(user._id)
        setFollowers(followerList.data);
        console.log(followers)

      } catch (err) {
        console.log(err);
      }
    };
    getFollowers();
  }, [user]);


  useEffect(() => {
    const getFollowings = async () => {
      try {
        const followingList = await followingsListUser(user._id)
        setFollowings(followingList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFollowings();
  }, [user]);


  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendsList = await friendsListUser(user._id)
        setFriends(friendsList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);




  useEffect(() => {
    const userFollowed = followers.find(follower => follower._id === currentUser._id)
    console.log(userFollowed)
    if (userFollowed === undefined)
      setIsSubscribed(false)
    else
      setIsSubscribed(true)
  }, [isSubscribed, followers]);


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
      setFollowed(!followed);
    } catch (err) {
      console.log(err)
    }
  }


  const addFriendClick = async () => {
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
        await addFriend(user._id, currentUser._id)
        //dispatch(AddFriend(user._id));
        localStorage.setItem("user", JSON.stringify({
          ...currentUser,
        }))
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err)
    }
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
            isSubscribed ?
              <div className="rightbarContainerButton">
                <button className="rightbarFollowButton" onClick={addFriendClick}>
                  {followed ? "Remove from friends" : "Add friend"}
                  {followed ? <Remove /> : <Add />}
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

          <h4 className="rightbarTitle">User friends</h4>
          <div className="rightbarFollowings">
            {friends.map((friend, index) => (
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