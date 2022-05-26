import "./rightbar.css";
import { Users } from "../../data";
import Friends from "../friends/Friends";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { FriendsList } from "../friendList/FriendList";
import { friendsListUser } from "../../services/friendsApi";
import { useSelector, useDispatch } from "react-redux";
import { Add, Remove } from "@mui/icons-material";
import { followUser, unfollowUser } from "../../services/friendsApi";

export default function Rightbar({ user }) {

  const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER
  const [friends, setFriends] = useState([])
  const dispatch = useDispatch();
  const [followed, setFollowed] = useState(false)
  console.log(user)
  const { user: currentUser } = useSelector(state => state.userReducer)
  console.log(currentUser)

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id))
  }, [user]);

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await friendsListUser(user._id)
        setFriends(friendList.data);
      } catch (err) {
        console.log(err);
      }
    };
    getFriends();
  }, [user]);


  const handleClick = async () => {
    try {
      if (followed) {
        await unfollowUser(user._id, currentUser._id)
        dispatch({ type: "UNFOLLOW_USER", payload: user._id });
      } else {
        await followUser(user._id, currentUser._id)
        dispatch({ type: "FOLLOW_USER", payload: user._id });
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err)
    }
  }


  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Your Friends</h4>
        <ul className="rightbarFriendList">
          {Users.map((u) => (
            <Friends key={u.id} user={u} />
          ))}
        </ul>
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
          {user.username !== currentUser.username && (
            <div className="rightbarContainerButton">
              <button className="rightbarFollowButton" onClick={handleClick}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove /> : <Add />}
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
              <span className="rightbarInfoValue">{user.from}</span>
            </div>
            <div className="rightbarInfoItem">
              <span className="rightbarInfoKey">Relationship:</span>
              <span className="rightbarInfoValue">{user.relationship === 1 ? "Single" : user.relationship === 2 ? "Married" : "-"}</span>
            </div>
          </div>
          <hr className="rightbarHr" />
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