import React from 'react'
import { useNavigate, Link} from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

const ResetPass = () => {
    const navigate = useNavigate();  
    const [otp, setOtp]=useState('');
    const [password, setPassword]=useState('');
  
  
  
    const handleSubmit = () => {
      console.log(otp, password);
      axios.post('http://localhost:3000/submit-otp',
          {
             otp: otp,
             password: password,
          })
          .then(res => {
              // console.log(res.data)
              // console.log('will navigate to login now');
              if (res.data.code === 200) {
                  navigate('/login')
              } 
              
          }).catch((err) => {
              console.log(err)
          })
        }



  return (
     <div className='d-inline-flex flex-row p-2 bd-highlight container my-3 '>
       
    <div className=' margin-left flex-vertical mx-5 signup'>
        <div className='container my-4'>
             <h3>Reset your password</h3>
        </div>
        <form >
        <div className="mb-3">
          <label className="form-label">Enter the OTP</label>
          <input type="Number" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp" value={otp} placeholder='Enter the otp here' onChange={(e)=>setOtp(e.target.value)} />
        
        </div>
        <div className="mb-3">
          <label htmlFor='exampleInputPassword1' className="form-label">New Password</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" value={password} onChange={(e)=>setPassword(e.target.value)} />
        </div>
       
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-outline-primary" onClick={handleSubmit}>Reset Password</button>
        </div>
        <div className="d-flex justify-content-center my-2">
        <Link to="/login">Login from here</Link>
        </div>
        
      </form>
  </div>
  {/* <div className='img-div' >
     <img src={ logImg } className='auth-image' alt='login'/>
    </div> */}

  
  </div>
  )
}

export default ResetPass
