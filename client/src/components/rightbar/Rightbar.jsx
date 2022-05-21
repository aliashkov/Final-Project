import "./rightbar.css";
import { Users } from "../../data";
import Friends from "../friends/Friends";

export default function Rightbar({ profile }) {
  const HomeRightbar = () => {
    return (
      <>
        <h4 className="rightbarTitle">Friends</h4>
        <ul className="rightbarFriendList">
           {Users.map(u => (
             <Friends key ={u.id} user={u}/>
           ))}
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