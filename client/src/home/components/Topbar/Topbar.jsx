import React from 'react'
import { NavLink } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react';
import {Home, Bell, MessageSquareMore, Menu, Search, Send} from 'lucide-react'

import ProfileDropdown from './ProfileDropdown';
import ThemeBtn from './ThemeBtn';
import SideMenu from './SideMenu';

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;



function Topbar() {
    
    const [IsMenuOpen, setIsMenuOpen] = useState(false)

    const toggleSideMenu= ()=>{
        setIsMenuOpen((prev)=> !prev)
    }

    const menuBtnRef = useRef(null)
    const sideMenuRef = useRef(null)
  
    useEffect(()=>{
       const closeSideMenuOutside = (e) =>{
           if (IsMenuOpen && !sideMenuRef.current.contains(e.target) && !menuBtnRef.current.contains(e.target)) {
                console.log('closing side menu when clicked outside')
                setIsMenuOpen(false);
            }
       }

       document.addEventListener('mousedown', closeSideMenuOutside)

       return () =>{
           document.removeEventListener('mousedown',closeSideMenuOutside)
       }
    })    


    const navItems = [
        {   name:"Home",
            href:"/feed",
            icon:Home,
        },
        {   name:"Chat",
            href:"/chat",
            icon:Send, 
        },
        {   name:"Alerts",
            href:"/alerts",
            icon:Bell,
        },
    ]    
    
    
  return (
    <> 
       <div ref={sideMenuRef} className={`fixed top-0 left-0 h-full z-30 flex flex-col justify-between transform ${IsMenuOpen? 'translate-x-0':'-translate-x-full'} transition-transform duration-300 ease-in-out`}>
            <SideMenu  toggleMenu={toggleSideMenu}/>
       </div>

       <div>
           
            <header className="fixed z-20 w-full shadow-lg bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
            	<div className="flex items-center mx-auto justify-between max-w-7xl  h-16 pl-10 pr-3">

                    <div className='items-start hidden lg:flex'>
            		    <ul className="inline-flex items-stretch space-x-3">

                            {navItems.map((item)=>(
                                <li key={item.name} className=''>
                                    
                                    <NavLink to={item.href} className={({isActive})=>`${isActive ? `text-${theme_color} ` : 'dark:text-gray-100 text-gray-600'} flex items-center px-1 -mb-1 hover:text-${theme_color} transition-transform hover:scale-105`}>
                                        <item.icon className='mr-2'/>
                                        {item.name}
                                    </NavLink>
                                </li>
                            ))}

            		    </ul>                        
                    </div>
            		

            		<a rel="noopener noreferrer" href="#" aria-label="Back to homepage" className="flex items-center p-2">
            			<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 32 32" className ={`w-8 h-8 text-${theme_color} dark:text-${theme_color}`}>
            				<path d="M27.912 7.289l-10.324-5.961c-0.455-0.268-1.002-0.425-1.588-0.425s-1.133 0.158-1.604 0.433l0.015-0.008-10.324 5.961c-0.955 0.561-1.586 1.582-1.588 2.75v11.922c0.002 1.168 0.635 2.189 1.574 2.742l0.016 0.008 10.322 5.961c0.455 0.267 1.004 0.425 1.59 0.425 0.584 0 1.131-0.158 1.602-0.433l-0.014 0.008 10.322-5.961c0.955-0.561 1.586-1.582 1.588-2.75v-11.922c-0.002-1.168-0.633-2.189-1.573-2.742zM27.383 21.961c0 0.389-0.211 0.73-0.526 0.914l-0.004 0.002-10.324 5.961c-0.152 0.088-0.334 0.142-0.53 0.142s-0.377-0.053-0.535-0.145l0.005 0.002-10.324-5.961c-0.319-0.186-0.529-0.527-0.529-0.916v-11.922c0-0.389 0.211-0.73 0.526-0.914l0.004-0.002 10.324-5.961c0.152-0.090 0.334-0.143 0.53-0.143s0.377 0.053 0.535 0.144l-0.006-0.002 10.324 5.961c0.319 0.185 0.529 0.527 0.529 0.916z"></path>
            				<path d="M22.094 19.451h-0.758c-0.188 0-0.363 0.049-0.515 0.135l0.006-0.004-4.574 2.512-5.282-3.049v-6.082l5.282-3.051 4.576 2.504c0.146 0.082 0.323 0.131 0.508 0.131h0.758c0.293 0 0.529-0.239 0.529-0.531v-0.716c0-0.2-0.11-0.373-0.271-0.463l-0.004-0.002-5.078-2.777c-0.293-0.164-0.645-0.26-1.015-0.26-0.39 0-0.756 0.106-1.070 0.289l0.010-0.006-5.281 3.049c-0.636 0.375-1.056 1.055-1.059 1.834v6.082c0 0.779 0.422 1.461 1.049 1.828l0.009 0.006 5.281 3.049c0.305 0.178 0.67 0.284 1.061 0.284 0.373 0 0.723-0.098 1.027-0.265l-0.012 0.006 5.080-2.787c0.166-0.091 0.276-0.265 0.276-0.465v-0.716c0-0.293-0.238-0.529-0.529-0.529z"></path>
            			</svg>
            		</a>
                    
            		<div className="flex items-center md:space-x-4">
                        <div className=''>
                            <ThemeBtn/>
                        </div>

                        <div className='hidden lg:flex items-center justify-between'>
            			    <div className="relative">
            			    	<span className="absolute inset-y-0 left-0 flex items-center pl-2">
            			    		<button type="submit" title="Search" className="p-1 focus:outline-none focus:ring">
                                        <Search fill="none" stroke="currentColor" className="w-4 h-4 text-gray-400"/>
            			    		</button>
            			    	</span>
    
            			    	<input type="search" name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-800 focus:bg-gray-100 focus:dark:bg-gray-200" />
            			    </div>
                            
                            <div className='flex items-center pl-4'>     
                                <ProfileDropdown/>
                            </div>
                        </div>

                        <div ref={menuBtnRef} className='flex'>
                            <button onClick={toggleSideMenu} title="Open menu" type="button" className="pl-2 md:pl-0 pr-2 "> 
            		    	    <Menu className="w-6 h-6 text-gray-800 dark:text-gray-200"/>
            		        </button>
                        </div>
                        
            		</div>
            		

            	</div>
            </header>
                       

       </div>
    </>
  )
}

export default Topbar
