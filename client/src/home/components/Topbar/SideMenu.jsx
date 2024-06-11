import React, { useEffect } from 'react'
import {useRef} from 'react'
import { NavLink } from 'react-router-dom'
import {X, Home, MessageSquareMore, Bell, Bookmark, Bolt, LogOut} from 'lucide-react'

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const SideMenu = ({ toggleMenu}) => {
  
    const sideMenuItems = [
      {   name:"Home",
          href:"/feed",
          icon:Home,
      },
      {   name:"Chat",
          href:"/chat",
          icon:MessageSquareMore, 
      },
      {   name:"Alerts",
          href:"/alerts",
          icon:Bell,
      },
      {   name:"Saved",
          href:"/saved",
          icon:Bookmark,
      },
      {   name:"Settings",
          href:"/settings",
          icon:Bolt,
      },
      {   name:"Logout",
          href:"/logout",
          icon:LogOut,
      },
    ]  

    //fixed top-0 left-0 h-full z-50 
  return (
        
        <div className={`flex flex-col justify-between  p-3 w-64 h-screen bg-gray-50 shadow-2xl dark:bg-slate-800 text-gray-800 dark:text-gray-200`}>
        	<div className="space-y-3">

        		<div className="flex items-center justify-between">
        			<h2 className='font-semibold'>Menu</h2>
        			<button onClick={toggleMenu} className={`p-2 rounded-md text-gray-400 hover:bg-${hover_color} dark:hover:bg-${theme_color} hover:bg-opacity-60 hover:text-gray-500 dark:hover:bg-opacity-20 dark:hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}>
                        <X />
        			</button>
        		</div>

        		<div className="relative">
        			<span className="absolute inset-y-0 left-0 flex items-center py-4">
        				<button type="submit" className="p-2 focus:outline-none focus:ring">
        					<svg fill="currentColor" viewBox="0 0 512 512" className="w-5 h-5 text-gray-400 dark:text-gray-400">
        						<path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
        					</svg>
        				</button>
        			</span>
        			<input type="search" name="Search" placeholder="Search..." className="w-full py-2 pl-10 text-sm dark:border- rounded-md focus:outline-none bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-800 focus:bg-gray-100 focus:dark:bg-gray-50" />
        		</div>

                <div className='divide-y dark:divide-gray-600 divide-gray-400'>
                    <div></div>
                    <div></div>
                </div>

        		<div className="flex-1 max-h-[450px] overflow-auto">
        			<ul className="pt-2 pb-4 space-y-1 text-sm ">
                        
                        {sideMenuItems.map((item,index) =>(
                            <li key={index} className={`rounded-lg hover:bg-${hover_color} dark:hover:bg-${theme_color} dark:hover:bg-opacity-20 hover:bg-opacity-60`}>
                                <NavLink rel="noopener noreferrer" to={item.href} className={({isActive})=>`${isActive ? `text-${theme_color} ` : 'dark:text-gray-100 text-gray-600'} flex items-center tracking-wider font-medium dark:font-normal p-2 space-x-3 rounded-md`}>
                                    <item.icon  className='size-6'/>
        					    	<span>{item.name}</span>
        					    </NavLink>
                            </li>
                        ))}
        				
        			</ul>
        		</div>
        	</div>

        	<div className=" flex items-center p-2 mt-12 space-x-4 justify-self-end">
        		<img src="https://4kwallpapers.com/images/walls/thumbs_3t/15138.jpg" alt="" className="w-12 h-12 object-cover rounded-full shadow dark:bg-gray-500" />
        		<div>
        			<h2 className="text-lg font-semibold">Username</h2>
        			<span className="flex items-center space-x-1">
        				<a rel="noopener noreferrer" href="#" className="text-xs hover:underline text-gray-400 dark:text-gray-600">View profile</a>
        			</span>
        		</div>
        	</div>

        </div>
              
    
  )
}

export default SideMenu
