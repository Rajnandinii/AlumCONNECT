import { Routes, Route } from "react-router-dom";

import './App.css'
import {Landing, About, Contact, SignUp, Login} from './landing&auth/components'
import LandingLayout from "./landing&auth/LandingLayout.jsx"

function App() {
  

  return (
    <>
      <Routes>
        {/* public routes */}
        <Route element={<LandingLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/Contact" element={<Contact />} />
        </Route>

        <Route path="/signup" element={<SignUp/>} />
        <Route path="/login" element={<Login/>} />

        {/* private routes */}

        {/* <Route element={<HomeLayout />}>
          <Route index element={<Home />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/saved" element={<Saved />} />
          <Route path="/all-users" element={<AllUsers />} />
          <Route path="/create-post" element={<CreatePost />} />
          <Route path="/update-post/:id" element={<EditPost />} />
          <Route path="/posts/:id" element={<PostDetails />} />
          <Route path="/profile/:id/*" element={<Profile />} />
          <Route path="/update-profile/:id" element={<UpdateProfile />} />
        </Route> */}
      </Routes>
      
    </>
  )
}

export default App
