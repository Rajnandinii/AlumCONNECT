import React from 'react'
import { useNavigate, Link, useNavigation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';



const ForgotPassword = () => {
    const navigate = useNavigate();  
    const [email, setEmail]=useState('');



    const handleSubmit = () => {
      console.log(email)
      axios.post('http://localhost:3000/send-otp',
          {
              email: email,
          })
          .then(res => {
              console.log(res.data)
              if (res.data.code === 200) {
                  navigate('/resetpass')
              } 
              
          }).catch((err) => {
              console.log(err)
          })
  }
  return (
    <div className='d-inline-flex  p-2 bd-highlight container my-3 '>
   
    <div className='flex-vertical py-5'>
    <h2>Forgot Password</h2>
    
    <div className="my-3 border ">
          {/* <label htmlFor='exampleInputEmail1 my-5' className="form-label">Registered Email</label> */}
          <input type="email" className="form-control forgp"  value={email} name="email" placeholder='Enter your registered email address' onChange={(e)=>setEmail(e.target.value)} />
        </div>
        <button type="button" className="btn btn-primary" onClick={handleSubmit}>SEND OTP</button>
    </div>
      
    </div>
  
)}

export default ForgotPassword
