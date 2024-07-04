import axios from "axios";
import { useEffect, useState } from "react";
import "./conversation.css";
import React from "react";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState('');
  // const PF = process.env.REACT_APP_PUBLIC_FOLDER;


  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/${friendId}`);
        
        setUser(res.data);
      } catch (err) {
        console.log('Error fetching user:', err);
      }
    };
    
    getUser();
  }, [currentUser, conversation]);


  return (
    <div className="conversation">
      <img
        className="conversationImg"
        src={ user.profilePicture || "assets/avatar.svg"
        }
        alt=""
      />
      <span className="conversationName">{user?.username}</span>
    </div>
  );
}