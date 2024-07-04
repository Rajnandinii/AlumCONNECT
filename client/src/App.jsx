import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import './App.css'
import {Landing, About, Contact, SignUp, Login} from './landing&auth/components'
import LandingLayout from "./landing&auth/LandingLayout.jsx"

import HomeLayout from "./home/HomeLayout.jsx";
import {MiddleFeed} from "./home/components"
import {HomePage} from "./home/Pages"
import ChatSection from "./home/Pages/Chats/chatsection/ChatSection.jsx";
import SetProfile from "./home/Pages/setprofile/SetProfile.jsx"
import Profile from "./home/Pages/profile/Profile.jsx";

function App() {

  const theme = useSelector((state) => state.colorTheme.theme);
  const {isAuth} = useSelector((state)=>state.auth)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);
  

  return (
    <>
      <Routes>
        {/* public routes */}
        
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Route>

        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={isAuth? <Navigate to={"/feed"}/> : <Login/>} />

        {/* private routes */}
  
        <Route path="/setprofile" element={isAuth? <SetProfile/> : <Navigate to={"/login"}/> } />
        <Route path="/profile" element={isAuth? <Profile/> : <Navigate to={"/login"}/> } />
        <Route path="/chatsection" element={isAuth? <ChatSection/> : <Navigate to={"/login"}/> } />
        <Route element={<HomeLayout />}>
          <Route path="/feed" element={isAuth ? <HomePage /> : <Navigate to={"/login"}/>} />
          
          {/* <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} /> */}
        </Route>
      </Routes>
      
    </>
  )
}

export default App
