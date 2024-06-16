import React from 'react'
import { Link, useNavigate} from 'react-router-dom';
import { useEffect, useState,  useRef } from 'react';
import axios from 'axios';

import {ToastContainer, toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

import { CircleChevronLeft } from 'lucide-react';

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const SignUp = () => {
    
    const courses = [
        {name:"B.Tech",},
        {name:"M.Tech",},
        {name:"BCA",},
        {name:"MCA",},
        {name:"PhD",},
    ]

    const branches = [
        {name:"Computer Science & Engg.",},
        {name:"Information Technology",},
        {name:"Electronics & Communication Engg.",},
        {name:"Electrical Engineering",},
        {name:"Mechanical Engineering",},
        {name:"Civil Engineering",},
        {name:"Chemical Engineering",},
        {name:"Bio Technology",},
    ]
    

   const [formData,setFormData] = useState({name:'',email:'',userType:'Student',gradYear:'', course:'B.Tech', branch:'Computer Science & Engg.', username:'', password:'', confirmPassword:''})

   const handleChange = (e) =>{
     const {name,value} = e.target
     setFormData({...formData, [name]:value})
   }
   
   /////////////////////////////////////////////////////////////////////////////////////////////////////////
   const [otp,setotp] = useState(new Array(4).fill(""))
   const navigate = useNavigate()
   const [loading, setLoading] = useState(false)

   function wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
   }
   
   const handleSubmit = async (e)=>{ 
      e.preventDefault();
      setLoading(true)

      const otp_to_send = otp.join('')
      if(otp_to_send.length < 4){
        toast.error('Enter 4-digit otp', {className:'dark:bg-gray-800 bg-gray-200 '})
        return 
      }
      //console.log(otp_to_send)
      
      try{

        const response = await axios.post("http://localhost:3000/api/auth/signup",
                                          {otp:otp_to_send ,name:formData.name , username:formData.username , email: formData.email, password: formData.password, role: formData.userType, gradyear: formData.gradyear, degree: formData.course, branch: formData.branch},
                                          {withCredentials: true,})
        
        if(!response.data.success){
            toast.error(`${response.data.message}`, {className:'dark:bg-gray-800 bg-gray-200 '})
            setLoading(false)
            return
        }

        toast.success('Your account has been created', {className:'dark:bg-gray-800 bg-gray-200 ', autoClose:2000})

        await wait(2000)

        navigate("/login")
      }
      catch(error){
          console.log(error)
          toast.error('An error occurred', { className: 'dark:bg-gray-800 bg-gray-200' })
      }finally{
        setLoading(false)
      }
  
    };

    //navigating through cards-------------------------------------------------------------
    
    const [isUsernameCardOpen, setIsUsernameCardOpen] = useState(false)
    const [isDetailsCardOpen, setIsDetailsCardOpen] = useState(true)
    const [isOTPCardOpen, setIsOTPCardOpen] = useState(false)

    const openUsernameCard = ()=>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const currentYear = new Date().getFullYear();

        if(formData.email && !emailRegex.test(formData.email)){
            toast.error('Please enter a valid email', {className:'dark:bg-gray-800 bg-gray-200 '})
        }
        else if(formData.gradYear && (formData.gradYear > currentYear+4 || formData.gradYear<1964)){  
                toast.error(`Enter a valid Graduation Year`, {className:'dark:bg-gray-800 bg-gray-200 '})
        }
        else if(!formData.name | !formData.email | !formData.gradYear ){
            toast.error('Complete all fields', {className:'dark:bg-gray-800 bg-gray-200 '})
        }
        else {
            setIsUsernameCardOpen(true)
            setIsDetailsCardOpen(false)
            setIsOTPCardOpen(false)
        }
    }
    
    const openDetailsCard = ()=>{
        setIsUsernameCardOpen(false)
        setIsDetailsCardOpen(true)
        setIsOTPCardOpen(false)
    }
    
    //send otp ----------------------------------
    const sendOTP = async ()=>{
        try{
            const response = await axios.post('http://localhost:3000/api/auth/send-otp', {email:formData.email, name:formData.name},
                                                                                         {withCredentials: true,})
            if(!response.data.success){
                toast.error(`${response.data.message}`, {className:'dark:bg-gray-800 bg-gray-200 '})
                return false
            }
            toast.success('OTP sent to your email', {className:'dark:bg-gray-800 bg-gray-200 '})
            return true
         }
         catch(error){
             toast.error('Error sending OTP', {className:'dark:bg-gray-800 bg-gray-200 '})
             console.error('Error sending otp', error);
             return false
         }  
    }

    const openOTPCard = async ()=>{
        if(!isUsernameAvail){
            toast.error('Please enter a different username', {className:'dark:bg-gray-800 bg-gray-200 '})
        }
        else if(formData.password !== formData.confirmPassword){
            toast.error('Passwords do not match', {className:'dark:bg-gray-800 bg-gray-200 '})
        }
        else if(formData.password && formData.password.length <6){
            toast.error('Password is too short', {className:'dark:bg-gray-800 bg-gray-200 '})
        }
        else{     
            if(await sendOTP()){     
                setIsOTPCardOpen(true)
                setIsUsernameCardOpen(false)
                setIsDetailsCardOpen(false)
                
            } 
        }
    }

    /////////////Checking availability of username-------------------------------------------------
    const [isUsernameAvail, setIsUsernameAvail] = useState(true)

    const checkFromServer = async (username) =>{
        try{
           const response = await axios.get('http://localhost:3000/api/auth/check-username', {
              params: {username}
           })
           setIsUsernameAvail(response.data.avail)
        }
        catch(error){
            console.error('Error checking username:', error);
            //toast.error('error in username')
        }
    }

    function debounce(func, delay) {
        let timeout;
        return function(...args) {
          clearTimeout(timeout);
          timeout = setTimeout(() => func.apply(this, args), delay);
        };
      }

    const debouncedCheck = useRef(debounce(checkFromServer, 2000)).current;

    const checkUsername = (e)=>{
        const username = e.target.value
        setFormData((prevFormData) => ({ ...prevFormData, username }));
        if(username){
            debouncedCheck(username)
        }
        else{
            return null
        }
    }

    ////////otp frontend ------------------------------------------
    
    const inputRefs = useRef([])

    const handleOTPChange = (e, index) =>{
        const value = e.target.value
        if (isNaN(value)) return;
        
        const newOtp = [...otp];
        newOtp[index] = value
        setotp(newOtp);

        if (value && index < 4 && inputRefs.current[index + 1]) {
            inputRefs.current[index + 1].focus();
        }
    }

    const handleKeyDown = (e, index) => {
        if (e.key === 'Backspace' && !otp[index] && index>0 && inputRefs.current[index-1]) {
            inputRefs.current[index - 1].focus();

        }
    };

    const [resendDisable, setResendDisable] = useState(false)
    const resend_otp= async ()=>{
        sendOTP()
        setResendDisable(true)
        await wait(60000)
        setResendDisable(false)
    }
    ////////////////////////////////////////////////////////////////////////



  return (
    

    <> 
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

           <div className='flex flex-col w-full py-6 pt-11 mx-auto md:w-3/5 lg:w-2/5'>
                <h1 className="mb-1 text-xl font-medium text-center dark:text-gray-300 text-gray-700 md:text-3xl">Create your Free Account</h1>
                <p className="mb-2 text-sm font-normal text-center text-gray-700 dark:text-gray-500 md:text-base">
                  Already have an account?
                  <span></span>
                  <Link to="/login" className={`text-${theme_color} hover:text-opacity-70`}> Sign in</Link>
                </p>
           </div>

           <div className='flex w-full items-center justify-center '>
                {/*Card*/}
                {isDetailsCardOpen && <div className='flex flex-col gap-5 h-[450px] w-[360px] rounded-lg shadow-2xl sm:w-[500px] md:w-[600px] dark:bg-gray-900 bg-gray-100 items-center justify-center'>
                    
                    <div className='flex  items-center justify-around w-full p-4 '>
                        <div className='flex flex-col w-full items-stretch'>
                            <label htmlFor='name' className='flex justify-start text-sm dark:text-gray-400 text-gray-400 mb-1'>
                               Name
                            </label>
                            <input id='name' name='name' type='text' value={formData.name} onChange={handleChange} placeholder='Enter Full Name' className={`placeholder-gray-500 w-full rounded-md py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none  dark:border border-2 dark:border-gray-800 border-gray-200  focus:border-lime-600`}/>
                        </div>
    
                       
                    </div>

                    <div className='flex  items-center justify-around w-full p-4 pt-0 '>
                        <div className='flex flex-col w-full items-stretch'>
                            <label htmlFor='email' className='flex justify-start text-sm dark:text-gray-400 text-gray-400 mb-1'>
                               Email
                            </label>
                            <input id='email' type='email' name='email' value={formData.email} onChange={handleChange} placeholder='Enter active email address' className={`placeholder-gray-500 w-full rounded-md py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none  dark:border border-2 dark:border-gray-800 border-gray-200  focus:border-lime-600`}/>
                        </div>
                    </div>

                    <div className='flex   items-center justify-stretch  w-full p-4 pt-0 '>
                        <div className='w-1/4 '>
                            <label htmlFor="userType" className="block mb-1 text-sm dark:text-gray-400 text-gray-400">Role</label>
                            <select defaultValue={formData.userType} onChange={handleChange} id="userType" name='userType' className={`bg-gray-50 dark:focus:bg-gray-950 focus:bg-white appearance-none rounded-md  block w-full py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700 outline-none dark:placeholder-gray-400   dark:border border-2 dark:border-gray-800 border-gray-300 focus:border-${theme_color} `}>
                              <option >Student</option>
                              <option value="Alumni">Alumni</option>
                            </select>
    
                        </div>
                        <div className='flex flex-col w-1/4 ml-2 items-stretch'>
                            <label htmlFor='gradYear' className='flex justify-start text-sm dark:text-gray-400 text-gray-400 mb-1'>
                               Batch
                            </label>
                            <input id='gradYear' name='gradYear' value={formData.gradYear} onChange={handleChange} type='number' placeholder='Graduation Year?' className={`placeholder-gray-500  w-full rounded-md py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none  dark:border border-2 dark:border-gray-800 border-gray-300 focus:border-${theme_color}`}/>
                        </div>

                    </div>

                    <div className='flex   items-center justify-stretch  w-full p-4 pt-0 '>
                        <div className='w-1/4'>
                            <label htmlFor="course" className="block mb-1 text-sm dark:text-gray-400 text-gray-400">Course</label>
                            <select id="course" name='course' value={formData.course} onChange={handleChange} className={`bg-gray-50 dark:focus:bg-gray-950 focus:bg-white appearance-none rounded-md  block w-full py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700 outline-none dark:placeholder-gray-400   dark:border border-2 dark:border-gray-800 border-gray-300 focus:border-${theme_color}`}>
                              {courses.map((course)=>(
                                <option key={course.name} value={course.name}>{course.name}</option>
                              ))}
                            </select>
                        </div>
                        <div className='w-3/4 ml-2'>
                            <label htmlFor="branch" className="block mb-1 text-sm dark:text-gray-400 text-gray-400">Branch</label>
                            <select id="branch" name='branch' value={formData.branch} onChange={handleChange} className={`bg-gray-50 dark:focus:bg-gray-950 focus:bg-white appearance-none rounded-md  block w-full py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700 outline-none dark:placeholder-gray-400   dark:border border-2 dark:border-gray-800 border-gray-300 focus:border-${theme_color}`}>
                              {branches.map((branch)=>(
                                <option key={branch.name} className='overflow-hidden' value={branch.name}>{branch.name}</option>
                              ))}
                            </select>
                        </div>

                        
                    </div>

                    <div className='flex items-center justify-end w-full p-4 pb-0 border-t mb-4 dark:border-gray-600 border-gray-400'>
                        <button onClick={openUsernameCard} className={`w-1/5 text-${theme_color} flex items-center justify-center h-8 transition-colors duration-200 hover:text-white hover:bg-opacity-70 dark:bg-gray-900 bg-gray-100 border border-${theme_color} hover:bg-${theme_color}  rounded-md `}>
                           <span className='text-md'>Next</span>
                           {/* <ChevronRight className='size-5 ml-2'/> */}
                        </button>
                        
                    </div>
                </div>}
                
                {/*------------------------------2nd card-------------------------------------- */}
                {isUsernameCardOpen && <div className=' flex flex-col h-[450px] w-[360px] rounded-lg shadow-2xl sm:w-[500px] md:w-[600px] dark:bg-gray-900 bg-gray-100 items-center justify-between'>
                  <div className='flex flex-col w-full items-center justify-start '>

                    <div className='flex  items-center justify-around w-full p-4  '>
                        <div className='flex flex-col w-full items-stretch'>
                            <label htmlFor='username' className='flex justify-start text-sm text-gray-400 mb-1'>
                               Username
                            </label>
                            <input id='username' name='username' type='text' value={formData.username} onChange={(e)=> {handleChange(e), checkUsername(e)}} placeholder='Choose a unique username' className={`placeholder-gray-500 w-full rounded-md py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none  dark:border border-2 dark:border-gray-800 border-gray-200  focus:border-lime-600`}/>
                            <p className={`${isUsernameAvail ? 'invisible':''} text-sm dark:text-red-400 text-red-800 mb-1 pl-2.5`}>Username already taken!</p>
                        </div>
                    </div>
                    
                    
                    <div className='flex flex-col items-start justify-start w-full p-4 pt-0 '>
                        <div className='flex flex-col w-full sm:w-1/2 items-stretch justify-start'>
                            <label htmlFor='password' className='flex justify-start text-sm  text-gray-400 mb-1'>
                               Password
                            </label>
                            <input id='password' name='password' onChange={handleChange} value={formData.password} type='password' placeholder='Use digits and symbols' className={`placeholder-gray-500 w-full rounded-md py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none  dark:border border-2 dark:border-gray-800 border-gray-300 focus:border-${theme_color}`}/>
                            <p className='invisible ml-2 text-sm dark:text-red-400 text-red-800 mb-1'>Choose a strong password!</p>
                    
                        </div>

                        <div className='flex flex-col w-full sm:w-1/2 items-stretch pt-4'>
                            <label htmlFor='confirmPassword' className='flex justify-start text-sm text-gray-400 mb-1'>
                               Confirm Password
                            </label>
                            <input id='confirmPassword' onChange={handleChange} value={formData.confirmPassword} name='confirmPassword' type='password' placeholder='Confirm Password' className={`placeholder-gray-500 w-full rounded-md py-1 px-2 text-md dark:text-gray-50 dark:bg-gray-700  bg-gray-50 dark:focus:bg-gray-950 focus:bg-white outline-none dark:border border-2 dark:border-gray-800 border-gray-300 focus:border-${theme_color}`}/>
                            
                        </div>
                    </div>
                  </div>  

                    <div className='flex items-center justify-between w-full p-4 border-t dark: border-gray-400'>
                        <button onClick={openDetailsCard} className={`w-1/5 text-gray-500 flex items-center justify-center h-8 transition-colors duration-200 dark:hover:text-white dark:bg-gray-900 bg-gray-100 dark:hover:bg-gray-700 hover:bg-gray-300 hover:text-gray-700 border dark:border-gray-600 border-gray-400 rounded-md `}>
                           <span className='text-md'>Prev</span>
                           {/* <ChevronRight className='size-5 ml-2'/> */}
                        </button>

                        <button onClick={openOTPCard} className={`w-1/5 text-${theme_color} flex items-center justify-center h-8 transition-colors duration-200 hover:text-white hover:bg-opacity-70 dark:bg-gray-900 bg-gray-100 border border-${theme_color} hover:bg-${theme_color}  rounded-md `}>
                           <span className='text-md'>Next</span>
                           {/* <ChevronRight className='size-5 ml-2'/> */}
                        </button>
                        
                    </div>
                    

                </div>}

                {/*---------------------------OTP----------------------------------------------- */}
                {isOTPCardOpen && 
                    <div className='relative flex flex-col h-[450px] w-[360px] rounded-lg shadow-2xl sm:w-[500px] md:w-[600px] dark:bg-gray-900 bg-gray-100 items-center justify-center'>
                        
                        {loading &&  <div className='absolute z-10 w-full h-full flex items-center justify-center'>
                                <div className='backdrop-blur-sm w-full h-full flex items-center justify-center'>
                                <div className={`w-16 h-16 border-4 border-dashed rounded-full  animate-spin dark:border-${theme_color}`}></div>
                                </div>
                            </div>}

                        <div className='absolute top-3 left-3 w-full justify-start dark:text-gray-800 text-gray-300 transform duration-200 dark:hover:text-gray-200 hover:text-gray-500'>
                            <button type='button' onClick={openUsernameCard}>
                                <CircleChevronLeft/>
                            </button>
                        </div>

                        <div className="p-4 pt-8 flex flex-col items-center justify-center text-center space-y-2 dark:text-gray-200">
                            <div className="font-semibold text-3xl">
                              <p>Email Verification</p>
                            </div>
                            <div className="flex flex-row text-sm font-medium text-gray-400">
                              <p>{`We have sent a code to your email ${formData.email}`}</p>
                            </div>
                        </div>


                        <div className='w-full'>
                            <div className='w-full flex justify-center items-center'>
                              <div className="sm:w-1/2 mb-5 flex flex-col items-center justify-center space-y-16 w-full">
                                <div className=" w-full flex flex-row items-center justify-between   mt-10">
                                  
                                  {otp.map((data,index)=>(
                                    <div className="w-full h-16 flex justify-center">
                                        <input key={index} value={data} type='text' maxLength='1' 
                                            onChange={(e)=>handleOTPChange(e, index)}
                                            onKeyDown={(e)=>handleKeyDown(e,index)} 
                                            ref={el => inputRefs.current[index] = el}
                                            className={`sm:w-2/3 w-1/2 h-full flex flex-col items-center justify-center text-center  outline-none rounded-xl border-2 dark:border-gray-700 dark:text-gray-100 text-gray-800 focus:border-${theme_color} text-lg bg-gray-200 dark:bg-gray-800 dark:focus:bg-gray-950 focus:bg-gray-50`}
                                        />
                                    </div>
                                  ))}
                                </div>
                    
                                <div className="flex flex-col space-y-5">
                                  <div>
                                    <button onClick={handleSubmit} className={`flex flex-row items-center justify-center text-center w-full border rounded-xl outline-none py-4 bg-${theme_color} bg-opacity-70 transform duration-200 hover:bg-opacity-100 border-none text-white text-md shadow-sm`}>
                                      Verify & Sign Up
                                    </button>
                                  </div>
                    
                                  <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                                    <p>Didn't recieve code?</p> 
                                    <button onClick={resend_otp} disabled={resendDisable} className={`flex flex-row items-center ${resendDisable? 'text-gray-300':`text-${theme_color}`}`} >{resendDisable? 'Wait 1 minute' : 'Resend'}</button>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                    </div>
                   
                }

           </div>


         
      </div>
    </>)
}

export default SignUp






































{/* <div class="flex justify-center">

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
            <div class="w-1/2 shadow-2xl">
                <img class="hidden object-cover w-full h-screen md:block" src="/images/object/9.jpg"/>
            </div>
             </div>
        </div> */}
