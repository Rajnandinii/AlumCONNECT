import React from 'react'
import {FaGithub, FaLinkedin, FaInstagram, FaArrowRight, FaChevronRight} from 'react-icons/fa'
import {SiGmail} from 'react-icons/si'
import { Link, NavLink } from 'react-router-dom';

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const ProfileLeftSidebar = () => {
  

  return (
    <div className='flex flex-col items-center'>

        <div className="flex flex-col items-center w-full p-6 pb-2 shadow-md rounded-lg dark:bg-gray-900 bg-gray-50 dark:text-gray-100 text-gray-800 border border-gray-300 dark:border-gray-800">
        	<img src="https://i.pinimg.com/736x/01/05/b5/0105b5a8865355f0c551606c4fee9120.jpg" alt="" className="w-32 h-32 mx-auto object-cover rounded-full bg-gray-500 aspect-square" />
        	
            <div className="space-y-4 text-center divide-y divide-gray-700">
        		<div className="my-2 space-y-1">
        			<h2 className="text-xl font-semibold sm:text-2xl">Thorfinn</h2>
        			<p className="px-2 text-sm dark:text-gray-400 text-gray-500">Full-stack developer</p>
        		</div>
                
                <div className='flex flex-col items-stretch text-sm px-2 dark:text-gray-300'>
                    <div className='flex justify-between mt-2'>
                         <div>Network </div>
                         <div className={`text-${theme_color}`}>13</div>
                    </div>
                    <div className='flex justify-between mt-2'>
                         <div>Views</div>
                         <div className={`text-${theme_color}`}>3</div>
                    </div>
                </div>

                <div className='flex flex-col items-stretch text-sm px-2 dark:text-gray-300'>
                    <NavLink className={`flex justify-between mt-2 hover:text-${theme_color}`}>
                        <span>View profile</span>
                        <FaChevronRight className='size-3 mt-1'/>
                    </NavLink>
                    <NavLink className={`flex justify-between mt-2 hover:text-${theme_color}`}>
                        <span>Edit profile</span>
                        <FaChevronRight className='size-3 mt-1'/>
                    </NavLink>
                    <NavLink className={`flex justify-between mt-2 hover:text-${theme_color}`}>
                        <span>Saved</span>
                        <FaChevronRight className='size-3 mt-1'/>
                    </NavLink>
                    
                </div>

        		<div className="flex justify-center pt-2 space-x-4 align-center">
        			<Link rel="noopener noreferrer" to="#" aria-label="GitHub" className={`p-2 rounded-md dark:text-gray-100 text-gray-800 hover:text-${theme_color}`}>
                        <FaGithub className='w-4 h-4 fill-current'/>
        			</Link>
        			<Link rel="noopener noreferrer" to="#" aria-label="Dribble" className={`p-2 rounded-md dark:text-gray-100 text-gray-800 hover:text-${theme_color}`}>
        				<FaLinkedin className='w-4 h-4 fill-current'/>
        			</Link>
        			<Link rel="noopener noreferrer" to="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=abc@abc.com" target="_blank" aria-label="Twitter" className={`p-2 rounded-md dark:text-gray-100 text-gray-800 hover:text-${theme_color}`}>
        				<SiGmail className='w-4 h-4 fill-current'/>
        			</Link>
        			<Link rel="noopener noreferrer" to="#" aria-label="Email" className={`p-2 rounded-md dark:text-gray-100 text-gray-800 hover:text-${theme_color}`}>
                        <FaInstagram className='w-4 h-4 fill-current'/>  
        			</Link>
        		</div>
        	</div>
        </div>
              
    </div>
  )
}

export default ProfileLeftSidebar
