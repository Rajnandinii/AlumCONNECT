import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useEffect, useState,  useRef } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


import { loginRedux } from '../../../redux/features/authSlice';
const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

function Login() {

  const [formData,setFormData] = useState({username:'', password:''})
  const handleChange = (e) =>{
    const {name,value} = e.target
    setFormData({...formData, [name]:value})
  }

  const [loading, setLoading] = useState(false)

  function wait(ms) {
     return new Promise(resolve => setTimeout(resolve, ms));
  }

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleSubmit = async ()=>{
     if(!formData.username | !formData.password){
        toast.error('Fill all fields!',{className:'dark:bg-gray-800 bg-gray-200 '})
        return
     }

     try{
       setLoading(true)
       const response = await axios.post('http://localhost:3000/api/auth/login', {username:formData.username, password:formData.password},
                                                                                 {withCredentials: true,} )
       
       if(!response.data.success){
        toast.error(`${response.data.message}`, {className:'dark:bg-gray-800 bg-gray-200 '})
        setLoading(false)
        return
       }

       toast.success('Logging in your Account', {className:'dark:bg-gray-800 bg-gray-200 ', autoClose:2000})
       
       const userInfo = response.data.user
       localStorage.setItem('userInfo', JSON.stringify(userInfo));  //IMP step
       
       await wait(2000)
       dispatch(loginRedux(userInfo))             //sending user info to store<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
   
       navigate("/feed")

     }
     catch(error){
      console.log(error)
      toast.error('An error occurred', { className: 'dark:bg-gray-800 bg-gray-200' })
     }finally{
      setLoading(false)
    }
  }


  return (
    <div>
      <ToastContainer position="top-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
      />
      

      <div className='w-full h-screen flex flex-col items-center justify-start dark:bg-gray-950 bg-gray-200'>
           
           <div className='w-full flex items-center justify-center p-4 mt-1 m-2 border-b dark:border-gray-800 border-gray-200 dark:bg-gray-900 bg-gray-50 shadow-xl'>
               <svg width="30" height="30" viewBox="0 0 50 56" className={`text-${theme_color}`} fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z" 
                  />
                </svg>
               <Link to={'/'}  className='text-2xl dark:text-gray-100 text-gray-800 font-bold ml-2'>
                   AlumMNNIT
               </Link>
           </div>

           <div className='flex flex-col w-full py-14 pt-11 mx-auto md:w-3/5 lg:w-2/5'>
                <h1 className="mb-1 text-xl font-medium text-center dark:text-gray-300 text-gray-700 md:text-3xl">Log In to your Account</h1>
                <p className="mb-2 text-sm font-normal text-center text-gray-700 dark:text-gray-500 md:text-base">
                  Don't have an account?
                  <span></span>
                  <Link to="/signup" className={`text-${theme_color} hover:text-opacity-70`}> Sign Up</Link>
                </p>
           </div>

           <div className='flex w-full items-center justify-center '>
                
                {/*------------------------------card-------------------------------------- */}
                {<div className='relative flex flex-col h-[400px] w-[330px] rounded-lg shadow-2xl sm:w-[400px] dark:bg-gray-900 bg-gray-100 items-center justify-between '>
                    
                    {loading && <div className='absolute z-10 w-full h-full flex items-center justify-center'>
                                  <div className='backdrop-blur-sm backdrop-brightness-75 w-full h-full flex items-center justify-center'>
                                      <div className={`w-16 h-16 border-4 border-dashed rounded-full  animate-spin border-${theme_color}`}></div>
                                  </div>
                            </div>}
                    
                    <div className='flex flex-col w-full items-center justify-start p-3'>

                      <div className='flex  items-center justify-around w-full p-4  '>
                        <div className='flex flex-col w-full items-stretch'>
                            <label htmlFor='username' className='flex justify-start text-sm text-gray-400 mb-1'>
                               Username
                            </label>
                            <input id='username' name='username' type='text' value={formData.username} onChange={handleChange} placeholder='Enter your Username' className={`placeholder-gray-500 w-full rounded-md py-2 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none  dark:border border-2 dark:border-gray-800 border-gray-200  focus:border-lime-600`}/>
                        </div>
                      </div>
                    
                    
                      <div className='flex flex-col items-start justify-start w-full p-4 pt-3 '>
                        <div className='flex flex-col w-full items-stretch justify-start'>
                            <label htmlFor='password' className='flex justify-start text-sm  text-gray-400 mb-1'>
                               Password
                            </label>
                            <input id='password' name='password' onChange={handleChange} value={formData.password} type='password' placeholder='Enter your Password' className={`placeholder-gray-500 w-full rounded-md py-2 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none  dark:border border-2 dark:border-gray-800 border-gray-300 focus:border-${theme_color}`}/>
                        </div>
                      </div>
                    </div>  

                    <div className='flex items-center justify-between w-full p-7 border-t dark:border-gray-700 '>

                          <button onClick={handleSubmit} className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-${theme_color} bg-opacity-70 transform duration-200 hover:bg-opacity-100 border-none text-white text-md shadow-sm`}>
                            Log In
                          </button>

                    </div>
                    

                </div>}
                
           </div>


         
      </div>
    </div>
  )
}

export default Login
