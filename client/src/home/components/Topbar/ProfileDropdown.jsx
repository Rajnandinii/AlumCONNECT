import React from 'react'
import { useState, useEffect, useRef} from 'react';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';



function ProfileDropdown() {
  const {user} = useSelector((state)=> state.auth)
  //for dropdown 
  const [Dropdown, setDropdown] = useState(false)
  const toggleDropdown = () =>{
    setDropdown((prev)=>!prev)
  }
  const dropdownRef = useRef()

  useEffect(()=>{
      const closeDropdown = (e)=>{
          if(!dropdownRef.current.contains(e.target)){
              setDropdown(false)
          }
      }
      document.addEventListener("mousedown", closeDropdown)

      return () => {
          document.removeEventListener('mousedown', closeDropdown);  //to close event listener
      };
  },[])

  const dropDownItems = [
    {   name:"Edit",
        href:"#",
    },
    {   name:"Views",
        href:"#",
    },
    {   name:"Icognito",
        href:"#",
    },
  ]  

  return (
    <div ref={dropdownRef} className='relative'>
          <div className=''>
              <button onClick={toggleDropdown}  className="flex items-center space-x-2 focus:outline-none">
                  <img alt="profile pic" src={user.profilePicture} className="object-cover w-8 h-8 rounded-full shadow dark:bg-gray-500" />   
              </button>
          </div>


          <div
          className={` ${Dropdown ? '' : 'hidden'} transition transform duration-150 ease-out origin-top-right absolute mt-6 top-7 lg:end-1  w-56 divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg dark:divide-gray-800 dark:border-gray-800 dark:bg-gray-900`}
          role="menu">
            <div className="p-2">
              
             <ul>
              {dropDownItems.map((item)=>(
                  <li key={item.name} className=''>
                      
                      <NavLink to={item.href} className={`block rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-300`}>
                          {item.name}
                      </NavLink>
                  </li>
              ))}
             </ul>
             
            </div>
        
          <div className="p-2">
            <form method="POST" action="#">
              <button
                type="submit"
                className="flex w-full items-center gap-2 rounded-lg px-4 py-2 text-sm text-red-700 hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-600/10"
                role="menuitem"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                  />
                </svg>
        
                Logout
              </button>
            </form>
          </div>
        </div>       
      
    </div>
  )
}


export default ProfileDropdown
