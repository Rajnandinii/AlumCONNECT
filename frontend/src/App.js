import React from 'react'
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css'
import Login from './components/Login'
import Register from './components/Register';
import Profile from './components/Profile';
import Home from './components/Home'
import ForgotPassword from './components/ForgotPassword';

import ResetPass from './components/ResetPass';


const App = () => {
  return <Router>
    <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
       
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/profile' element={<Profile/>}></Route>
        
       
        <Route path='/forgotpassword' element={<ForgotPassword/>}></Route>
        <Route path='/resetpass' element={<ResetPass/>} ></Route>
    </Routes>
  </Router>
}

export default App
