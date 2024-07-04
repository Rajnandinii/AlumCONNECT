import './chatOnline.css'
import axios from "axios";
import { useEffect, useState } from "react";
import Online from '../online/Online';

const ChatOnline = ({ onlineUsers, currentId, setCurrentChat }) => {

  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);
   
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/friends/${currentId}`);
      setFriends(res.data);
      ('friends',friends)
    };  

    getFriends();
  }, [currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers]);

  console.log('onlineUsers:', onlineUsers)

  const handleClick = async (user) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/conversations/find/${currentId}/${user._id}`
      );
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="chatOnline">
    {onlineFriends.map((o) => (
      <div key={o._id} className="chatOnlineFriend" onClick={() => handleClick(o)}>
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={o?.profilePicture}
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.username}</span>
      </div>
    ))}
  </div>
  )
}

export default ChatOnline
