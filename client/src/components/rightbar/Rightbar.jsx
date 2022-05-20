import "./rightbar.css";
import { Users } from "../../data";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriendList">
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src="assets/person/1.jpg" alt="" />
                </div>
                <span className="rightbarUsername">Vitaliy </span>
            </li>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src="assets/person/1.jpg" alt="" />
                </div>
                <span className="rightbarUsername">Vitaliy </span>
            </li>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src="assets/person/1.jpg" alt="" />
                </div>
                <span className="rightbarUsername">Vitaliy </span>
            </li>
            <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                    <img className="rightbarProfileImg" src="assets/person/1.jpg" alt="" />
                </div>
                <span className="rightbarUsername">Vitaliy </span>
            </li>
        </ul>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
      <HomeRightbar/>
      </div>
    </div>
  );
}