import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import './App.css'
import {Landing, About, Contact, SignUp, Login} from './landing&auth/components'
import LandingLayout from "./landing&auth/LandingLayout.jsx"

import HomeLayout from "./home/HomeLayout.jsx";
import {MiddleFeed} from "./home/components"
import {HomePage} from "./home/Pages"

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
