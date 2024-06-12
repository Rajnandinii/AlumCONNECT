import React from 'react'
import { useNavigate, Link, useNavigation} from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const SignUp = () => {
   
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
      
      axios.post("http://localhost:3000/api/auth/signup", {name, username, email, password, usermode, gradyear, degree, branch, curaddress, peraddress, phone, interests})
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
    // <div className='w-1/2 h-full '>
    //   <h2>Register yourself here!</h2>
    //   <label>Name</label>
    //   <input  className='form-control mb-3' type="text" value={name} 
    //   onChange={(e)=>{setName(e.target.value)}}
    //  />

    //  <label>Username</label>
    //  <input  className='form-control mb-3' type="text" value={username} 
    //   onChange={(e)=>{setUsername(e.target.value)}}
    //  />

    //  <label>Email</label>
    //  <input  className='form-control mb-3' type="text" value={email} 
    //   onChange={(e)=>{setEmail(e.target.value)}}
    //  />
    //  <label>Password</label>
    //  <input  className='form-control mb-3' type="text" value={password} 
    //   onChange={(e)=>{setPassword(e.target.value)}}
    //  />

    //   <label>Current association with insitute</label>
    //   <select className='form-control mb-3' value={usermode}
    //  onChange={(e)=>{setMode(e.target.value)}}>
    //       <option>Student</option>
    //       <option>Alumni</option>
          
    //  </select>

    //  <label>Graduation year</label>
    //  <input  className='form-control mb-3' type="number" value={gradyear}
    //   onChange={(e)=>{setGradYear(e.target.value)}}
    //  />

    //  <label>Degree</label>
    //  <input  className='form-control mb-3' type="text" value={degree} 
    //   onChange={(e)=>{setDegree(e.target.value)}}
    //  />
    //  <label>Branch</label>
    //  <input  className='form-control mb-3' type="text" value={branch} 
    //   onChange={(e)=>{setBranch(e.target.value)}}
    //  />
    //  <label>Current Address</label>
    //  <input  className='form-control mb-3' type="text" value={curaddress} 
    //   onChange={(e)=>{setCurAddress(e.target.value)}}
    //  />
    //  <label>Permanent Address</label>
    //  <input  className='form-control mb-3' type="text" value={peraddress} 
    //   onChange={(e)=>{setPerAddress(e.target.value)}}
    //  />
    //  <label>Phone Number</label>
    //  <input  className='form-control mb-3' type="number" value={phone} 
    //   onChange={(e)=>{setNumber(e.target.value)}}
    //  />
    //  <label>Interests</label>
    //  <input  className='form-control mb-3' type="text" value={interests} 
    //   onChange={(e)=>{setInterests(e.target.value)}}
    //  />
    //    <button onClick={handleSubmit} className='btn btn-primary my-3'>Submit</button>
    
    // </div>
    
<div class="flex justify-center">

    <div class="flex flex-col w-full md:w-full h-[100vh]">
    <div className="w-1/2 bg-gray-200 p-4">

        <div class="flex justify-center pt-12 md:justify-start md:pl-12 md:-mb-24">
            <a href="#" class="p-4 text-xl font-bold text-white bg-black">
                Design.
            </a>
        </div>
        <div class="flex flex-col justify-center px-8 pt-8 my-auto md:justify-start md:pt-0 md:px-24 lg:px-32">
            <p class="text-3xl text-center">
                Welcome.
            </p>
            <form class="flex flex-col pt-3 md:pt-8">
                <div class="flex flex-col pt-4">
                    <div class="flex relative ">
                        <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                            <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                <path d="M1792 710v794q0 66-47 113t-113 47h-1472q-66 0-113-47t-47-113v-794q44 49 101 87 362 246 497 345 57 42 92.5 65.5t94.5 48 110 24.5h2q51 0 110-24.5t94.5-48 92.5-65.5q170-123 498-345 57-39 100-87zm0-294q0 79-49 151t-122 123q-376 261-468 325-10 7-42.5 30.5t-54 38-52 32.5-57.5 27-50 9h-2q-23 0-50-9t-57.5-27-52-32.5-54-38-42.5-30.5q-91-64-262-182.5t-205-142.5q-62-42-117-115.5t-55-136.5q0-78 41.5-130t118.5-52h1472q65 0 112.5 47t47.5 113z">
                                </path>
                            </svg>
                        </span>
                        <input type="text" id="design-login-email" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Email"/>
                        </div>
                    </div>
                    <div class="flex flex-col pt-4 mb-12">
                        <div class="flex relative ">
                            <span class=" inline-flex  items-center px-3 border-t bg-white border-l border-b  border-gray-300 text-gray-500 shadow-sm text-sm">
                                <svg width="15" height="15" fill="currentColor" viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M1376 768q40 0 68 28t28 68v576q0 40-28 68t-68 28h-960q-40 0-68-28t-28-68v-576q0-40 28-68t68-28h32v-320q0-185 131.5-316.5t316.5-131.5 316.5 131.5 131.5 316.5q0 26-19 45t-45 19h-64q-26 0-45-19t-19-45q0-106-75-181t-181-75-181 75-75 181v320h736z">
                                    </path>
                                </svg>
                            </span>
                            <input type="password" id="design-login-password" class=" flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" placeholder="Password"/>
                            </div>
                        </div>
                        <button type="submit" class="w-full px-4 py-2 text-base font-semibold text-center text-white transition duration-200 ease-in bg-black shadow-md hover:text-black hover:bg-white focus:outline-none focus:ring-2">
                            <span class="w-full">
                                Submit
                            </span>
                        </button>
                    </form>
                    <div class="pt-12 pb-12 text-center">
                        <p>
                            Don&#x27;t have an account?
                            <a href="#" class="font-semibold underline">
                                Register here.
                            </a>
                        </p>
                    </div>
                </div>
            </div>
            {/* <div class="w-1/2 shadow-2xl">
                <img class="hidden object-cover w-full h-screen md:block" src="/images/object/9.jpg"/>
            </div> */}
             </div>
        </div>

  )
}

export default SignUp
