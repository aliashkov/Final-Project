import { Link } from "react-router-dom";
//import "rightbar.css";
import "../filter/filter.css"
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


export const Filter = ({ user , hiddenString }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    const onLinkClick = () => {
        hiddenString()
    }

    return (
        <>
            <div className="userFind">
                <div className="userTopLeft">
                    <Link to={`/profile/${user.username}`} onClick={onLinkClick}>
                        <img
                            className="userProfileImg"
                            src={user.profilePicture ? PUBLIC_FOLDER + user.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"}
                            alt=""
                        />
                    </Link>

                    <span className="userUsername">
                        {user.username}
                    </span>
                </div>
                <div className="userTopRight">
                    <Link to={`/profile/${user.username}`} onClick={onLinkClick}>
                        <ExitToAppIcon />
                    </Link>

                </div>
            </div>
        </>
    );
};