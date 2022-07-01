import { Link } from "react-router-dom";
import "../filter/filter.css"
import ExitToAppIcon from "@mui/icons-material/ExitToApp";


export const Filter = ({ findUser , hiddenString }) => {
    const PUBLIC_FOLDER = process.env.REACT_APP_PUBLIC_FOLDER

    const onLinkClick = () => {
        hiddenString()
    }

    return (
        <>
            <div className="userFind">
                <div className="userTopLeft">
                    <Link to={`/profile/${findUser.username}`} onClick={onLinkClick}>
                        <img
                            className="userProfileImg"
                            src={findUser.profilePicture ? PUBLIC_FOLDER + findUser.profilePicture : PUBLIC_FOLDER + "person/noAvatar.png"}
                            alt=""
                        />
                    </Link>

                    <span className="userUsername">
                        {findUser.username}
                    </span>
                </div>
                <div className="userTopRight">
                    <Link to={`/profile/${findUser.username}`} onClick={onLinkClick}>
                        <ExitToAppIcon />
                    </Link>

                </div>
            </div>
        </>
    );
};