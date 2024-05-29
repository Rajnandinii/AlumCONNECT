import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const Login = () => {
    const [email, setEmail]=useState();
    const [password, setPassword] = useState();
    
    const navigate = useNavigate();

    axios.defaults.withCredentials = true;
    
    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/login", {email, password,})
        .then( response => {
          if(response.data.status){
            navigate('/')
          }
       })
        .catch(err => console.log(err));
    
    };
  return (
    <div className='d-inline-flex flex-row p-2 bd-highlight container my-3 '>
       
    <div className=' margin-left flex-vertical mx-5 signup'>
        <div className='container my-4'>
             <h1>Log Into Your Account</h1>
        </div>
          <form  onSubmit={handleLogin}>
        <div className="mb-3">
          <label htmlFor='exampleInputEmail1' className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name="email" aria-describedby="emailHelp"  placeholder='Enter your email address' onChange={(e) => setEmail(e.target.value)}/>
          <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor='exampleInputPassword1' className="form-label">Password</label>
          <input type="password" className="form-control" name="password" id="exampleInputPassword1" onChange={(e) => setPassword(e.target.value)}/>
        </div>
        <Link to="/forgotpassword">Forgot Password</Link>
        <div className="d-flex justify-content-center">
        <button type="submit" className="btn btn-outline-primary">LOGIN</button>
        </div>
        <div className="d-flex justify-content-center my-2">
        <p>Not Registered?   </p><Link to="/register">Sign Up here</Link>
        </div>
        
      </form>
  </div>
  {/* <div className='img-div' >
     <img src={ logImg } className='auth-image' alt='login'/>
    </div> */}

  
  </div>
  )
}

export default Login
