import './ChatSection.css'
import { useEffect, useState, useRef } from 'react';
import Conversations from '../conversations/Conversations';
import Message from '../message/Message';
import ChatOnline from '../chatOnline/ChatOnline';
import axios from 'axios';
import { io } from 'socket.io-client';
import { useDispatch, useSelector } from 'react-redux';

const ChatSection = () => {
  const {user}=useSelector((state)=>state.auth);
  const [conversations, setConversations] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const socket = useRef();
  const token = localStorage.getItem('token');
  const scrollRef = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    socket.current.on("getMessage", (data) => {
      setArrivalMessage({
        sender: data.senderId,
        text: data.text,
        createdAt: Date.now(),
      });
    });
  }, []);

  useEffect(() => {
    arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.sender) &&
      setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage, currentChat]);

  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/auth/getuser`, {}, {
  //         withCredentials: true
  //       });
  //       setUser(res.data);
  //     } catch (err) {
  //       console.error(err);
  //     }
  //   };

  //   fetchUser();
  // }, [token]);

  useEffect(() => {
    socket.current.emit("addUser", user._id);
    socket.current.on("getUsers", (users) => {
      if (users && user.followings) {
        console.log('testing')
        setOnlineUsers(
          user.followings.filter((f) => users.some((u) => u.userId === f))
         
        );
      }
    });
  }, [user]);



  useEffect(() => {
    const getConversations = async () => {
      if (user && user._id) {
        try {
          const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/conversations/${user._id}`);
          setConversations(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    getConversations();
  }, [user]);
  console.log('currentChat', currentChat);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/messages/${currentChat._id}`);
        setMessages(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMessages();
  }, [currentChat]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const message = {
      sender: user._id,
      text: newMessage,
      conversationId: currentChat._id,
    };

    console.log('currentchat', currentChat);
    const receiverId = currentChat.members.find(member => member !== user._id);

    socket.current.emit("sendMessage", {
      senderId: user._id,
      receiverId,
      text: newMessage
    });

    console.log(' senderId:', user._id,
      receiverId,
      'text' ,newMessage)

    try {
      const res = await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/messages`, message);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    const fetchChatUser = async () => {
      if (currentChat && currentChat.members) {
        const chatUserId = currentChat.members.find((m) => m !== user._id);
        try {
          const res = await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/auth/${chatUserId}`);
          setChatUser(res.data);
        } catch (err) {
          console.log(err);
        }
      }
    };

    fetchChatUser();
  }, [currentChat, user._id]);

console.log('chatusername', chatUser)


return (
  <div className="messenger">
   <div className="chatMenu">
      <div className="chatMenuWrapper">
        <div className="sectionTitle">Conversations</div>
        <div className="conversationsList">
          {conversations.map((c) => (
            <div key={c._id} onClick={() => setCurrentChat(c)}>
              <Conversations conversation={c} currentUser={user} />
            </div>
          ))}
        </div>
      </div>
    </div>
    <div className="chatBox">
      <div className="chatBoxWrapper">
        {currentChat ? (
          <>
            {chatUser && (
              <div className="chatUserName">
                {chatUser.username}
              </div>
            )}
            <div className="chatBoxTop">
              {messages.map((m) => (
                <div key={m._id} ref={scrollRef}>
                  <Message message={m} own={m.sender === user._id}/>
                </div>
              ))}
            </div>
            <div className="chatBoxBottom">
              <textarea
                className="chatMessageInput"
                placeholder="Enter your text here."
                onChange={(e) => setNewMessage(e.target.value)}
                value={newMessage}
              ></textarea>
              <button className="chatSubmitButton" onClick={handleSubmit}>
                Send
              </button>
            </div>
          </>
        ) : (
          <span className="noConversationText">
            Open a conversation to start a chat.
          </span>
        )}
      </div>
    </div>
   
    <div className="chatOnline">
      <div className="chatOnlineWrapper">
        <div className="sectionTitle">Online Users</div>
        <div className="onlineUsersList">
          <ChatOnline
            onlineUsers={onlineUsers}
            currentId={user._id}
            setCurrentChat={setCurrentChat}
          />
        </div>
      </div>
    </div>
  </div>
);
};
export default ChatSection;
