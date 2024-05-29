import React from 'react'
import { useNavigate, Link, useNavigation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Register = () => {
   
   const navigate = useNavigate();  
   const [name,setName]=useState('');
   const [username,setUsername]=useState('');
   const [email,setEmail]=useState('');
   const [password,setPassword]=useState('');
   const [usermode, setMode]=useState('Student');
   const [gradyear, setGradYear]=useState('');
   const [degree, setDegree]=useState('');
   const [branch, setBranch]=useState('');
   const [curaddress, setCurAddress] = useState('');
   const [peraddress, setPerAddress] = useState('');
   const [phone, setNumber]=useState('');
   const [interests, setInterests]=useState('')


   const handleSubmit =(e)=>{

    
      e.preventDefault();
      axios.post("http://localhost:3000/auth/register", {name, username, email, password, usermode, gradyear, degree, branch, curaddress, peraddress, phone, interests})
      .then( response => {
        if(response.data.status){
          navigate('/login')
        }
     })
      .catch(err => console.log(err));
  
  };





    // const formData = new FormData();
    //  formData.append('name', name)
    //  formData.append('username', username)
    //  formData.append('email',email)
    //  formData.append('password', password)
    //  formData.append('usermode', usermode)
    //  formData.append('gradyear', gradyear)
    //  formData.append('degree', degree)
    //  formData.append('branch', branch)
    //  formData.append('curaddress', curaddress)
    //  formData.append('peraddress', peraddress)
    //  formData.append('phone', phone)
    //  formData.append('interests', interests)

    // const url='http://localhost:3000/auth/register';
    //  axios.post(url, formData )
    //  .then((res) =>{
    //       console.log(res);
    //       if(res.data.message){
    //         alert(res.data.message);
    //         navigate('/login');
    //       }
    //  })
    //  .catch((err)=>{
    //   console.log(err);
    //  });

  //  }


  return (
    <div>
      <h2>Register yourself here!</h2>
      <label>Name</label>
      <input  className='form-control mb-3' type="text" value={name} 
      onChange={(e)=>{setName(e.target.value)}}
     />

     <label>Username</label>
     <input  className='form-control mb-3' type="text" value={username} 
      onChange={(e)=>{setUsername(e.target.value)}}
     />

     <label>Email</label>
     <input  className='form-control mb-3' type="text" value={email} 
      onChange={(e)=>{setEmail(e.target.value)}}
     />
     <label>Password</label>
     <input  className='form-control mb-3' type="text" value={password} 
      onChange={(e)=>{setPassword(e.target.value)}}
     />

      <label>Current association with insitute</label>
      <select className='form-control mb-3' value={usermode}
     onChange={(e)=>{setMode(e.target.value)}}>
          <option>Student</option>
          <option>Alumni</option>
          
     </select>

     <label>Graduation year</label>
     <input  className='form-control mb-3' type="number" value={gradyear}
      onChange={(e)=>{setGradYear(e.target.value)}}
     />

     <label>Degree</label>
     <input  className='form-control mb-3' type="text" value={degree} 
      onChange={(e)=>{setDegree(e.target.value)}}
     />
     <label>Branch</label>
     <input  className='form-control mb-3' type="text" value={branch} 
      onChange={(e)=>{setBranch(e.target.value)}}
     />
     <label>Current Address</label>
     <input  className='form-control mb-3' type="text" value={curaddress} 
      onChange={(e)=>{setCurAddress(e.target.value)}}
     />
     <label>Permanent Address</label>
     <input  className='form-control mb-3' type="text" value={peraddress} 
      onChange={(e)=>{setPerAddress(e.target.value)}}
     />
     <label>Phone Number</label>
     <input  className='form-control mb-3' type="number" value={phone} 
      onChange={(e)=>{setNumber(e.target.value)}}
     />
     <label>Interests</label>
     <input  className='form-control mb-3' type="text" value={interests} 
      onChange={(e)=>{setInterests(e.target.value)}}
     />
       <button onClick={handleSubmit} className='btn btn-primary my-3'>Submit</button>
    
    </div>
  )
}

export default Register
