import { Link } from "react-router-dom";


export const FriendsList = ({ friend }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    return (
        <>
            <Link
                to={"/profile/" + friend.username}
                style={{ textDecoration: "none" }}
            >

                <div className="rightbarFollowing">
                    <img
                        src={
                            friend.profilePicture
                                ? PUBLIC_FOLDER + friend.profilePicture
                                : PUBLIC_FOLDER + "person/noAvatar.png"
                        }
                        alt=""
                        className="rightbarFollowingImg"
                    />
                    <span className="rightbarFollowingName">{friend.username}</span>
                </div>
            </Link>
        </>
    );
};