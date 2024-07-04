import React from 'react';
import './profilerightbar.css';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import axios from 'axios';

const ProfileRightBar = () => {
  const user= useSelector((state)=>state.auth);

  const [friends, setFriends] = useState([]);
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/friends/${user.user._id}`);
      setFriends(res.data);
      ('friends',friends)
    };  

    getFriends();
  }, [user]);
  console.log(friends)
  
  

  return (
    <div className="rightbar">
      <h4 className="rightbarTitle">User Friends</h4>
      <div className="rightbarFriends">
        {friends.map((friend) => (
          <div key={friend._id} className="rightbarFriend">
            <img
              src={friend.profilePicture}
              alt={friend.username}
              className="rightbarFriendImg"
            />
            <span className="rightbarFriendName">{friend.username}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileRightBar;
