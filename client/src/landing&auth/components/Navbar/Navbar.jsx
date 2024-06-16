import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Menu, X, ChevronDown, ChevronRight } from 'lucide-react'
import { useDispatch } from "react-redux";

import { toggleTheme } from "../../../redux/features/themeSlice";

//importing theme color
const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const menuItems = [
  {
    name: 'Home',
    href: '/',
  },
  {
    name: 'About',
    href: '/about',
  },
  {
    name: 'Contact',
    href: '/contact',
  },
]



function Navbar(){

        
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const dispath = useDispatch();

  const changeTheme =() =>{
      dispath(toggleTheme())
  }

  return (
    <div className="fixed z-20 w-full bg-gray-50 dark:bg-gray-900 dark:text-gray-200" >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 sm:px-6 lg:px-8">

        <div className="inline-flex items-center space-x-2 p-2">
          <span>
            <svg
              width="30"
              height="30"
              viewBox="0 0 50 56"
              className={`text-${theme_color}`}
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                
              />
            </svg>
          </span>
          <span className="font-bold">AluMNNIT</span>
        </div>

        <div className="hidden grow items-start lg:flex">
          <ul className="ml-12 inline-flex space-x-8">
            {menuItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={({isActive})=>`${isActive ? `text-${theme_color}` : 'dark:text-gray-200 text-gray-800'} inline-flex items-center text-sm font-semibold hover:text-${theme_color}`}
                  >
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden space-x-2 lg:flex items-stretch justify-center h-full">
          <button
            type="button"
            className={`rounded-md bg-transparent text-sm font-semibold text-black dark:text-gray-200 hover:bg-${hover_color} dark:hover:bg-${theme_color} dark:hover:bg-opacity-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
          >
            <Link to={"/login" } className="mx-3 my-2">Log In</Link>
          </button>
          <button
            type="button"
            className={`rounded-md border border-${theme_color} px-3 py-2 text-sm font-semibold text-${theme_color}  shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
          >
            <Link to={"/signup"} >Sign Up</Link>
          </button>
    
        </div>

        {/* -----------Dark mode toggle------------ */}
        <div className="mx-3 hidden lg:block">
            <div className="p-1">
            <button
                onClick={changeTheme}
                type="button" 
                className={` px-2 py-1 h-9 w-9 shadow-sm shadow-${theme_color} dark:shadow-${theme_color} rounded-lg p-2 hover:bg-${hover_color} dark:hover:bg-${theme_color} dark:hover:bg-opacity-20`}
                >
                <svg className={`fill-${theme_color} dark:hidden`} fill="currentColor" viewBox="0 0 20 20">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                </svg>
                <svg className="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                    <path
                        d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                        fillRule="evenodd" clipRule="evenodd"></path>
                </svg>
            </button>
            </div>
        </div>
        {/* ----------------------- */}     

        <div className="lg:hidden flex items-center  justify-between">
          <Menu onClick={toggleMenu} className="h-6 w-6 cursor-pointer" />
          {/*------------------------------------------ */}
          <div className="ml-3 lg:hidden">
               <div className="p-1">
               <button
                   onClick={changeTheme}
                   type="button" 
                   className={` px-2 py-1 h-9 w-9 shadow-sm shadow-${theme_color} dark:shadow-${theme_color} rounded-lg p-2 hover:bg-${hover_color} dark:hover:bg-${theme_color} dark:hover:bg-opacity-20`}
                   >
                   <svg className={`fill-${theme_color} dark:hidden`} fill="currentColor" viewBox="0 0 20 20">
                       <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z"></path>
                   </svg>
                   <svg className="fill-yellow-500 hidden dark:block" fill="currentColor" viewBox="0 0 20 20">
                       <path
                           d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                           fillRule="evenodd" clipRule="evenodd"></path>
                   </svg>
               </button>
               </div>
          </div>
             
           {/*------------------------------------------ */}
          
        </div>
        {(
          <div className={`fixed inset-x-0 top-0 z-50 origin-top-right transform p-2 ${isMenuOpen ? 'translate-y-0':'-translate-y-full'}  transition-transform duration-300 ease-in-out lg:hidden`}>
            <div className="divide-y-2 divide-gray-50 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5">
              <div className="px-5 pb-6 pt-5">
                <div className="flex items-center justify-between">
                  <div className="inline-flex items-center space-x-2">
                    <span>
                      <svg
                        width="30"
                        height="30"
                        viewBox="0 0 50 56"
                        className={`text-${theme_color}`}
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M23.2732 0.2528C20.8078 1.18964 2.12023 12.2346 1.08477 13.3686C0 14.552 0 14.7493 0 27.7665C0 39.6496 0.0986153 41.1289 0.83823 42.0164C2.12023 43.5449 23.2239 55.4774 24.6538 55.5267C25.9358 55.576 46.1027 44.3832 48.2229 42.4602C49.3077 41.474 49.3077 41.3261 49.3077 27.8158C49.3077 14.3055 49.3077 14.1576 48.2229 13.1714C46.6451 11.7415 27.1192 0.450027 25.64 0.104874C24.9497 -0.0923538 23.9142 0.00625992 23.2732 0.2528ZM20.2161 21.8989C20.2161 22.4906 18.9835 23.8219 17.0111 25.3997C15.2361 26.7803 13.8061 27.9637 13.8061 28.0623C13.8061 28.1116 15.2361 29.0978 16.9618 30.2319C18.6876 31.3659 20.2655 32.6479 20.4134 33.0917C20.8078 34.0286 19.871 35.2119 18.8355 35.2119C17.8001 35.2119 9.0233 29.3936 8.67815 28.5061C8.333 27.6186 9.36846 26.5338 14.3485 22.885C17.6521 20.4196 18.4904 20.0252 19.2793 20.4196C19.7724 20.7155 20.2161 21.3565 20.2161 21.8989ZM25.6893 27.6679C23.4211 34.9161 23.0267 35.7543 22.1391 34.8668C21.7447 34.4723 22.1391 32.6479 23.6677 27.9637C26.2317 20.321 26.5275 19.6307 27.2671 20.3703C27.6123 20.7155 27.1685 22.7864 25.6893 27.6679ZM36.0932 23.2302C40.6788 26.2379 41.3198 27.0269 40.3337 28.1609C39.1503 29.5909 31.6555 35.2119 30.9159 35.2119C29.9298 35.2119 28.9436 33.8806 29.2394 33.0424C29.3874 32.6479 30.9652 31.218 32.7403 29.8867L35.9946 27.4706L32.5431 25.1532C30.6201 23.9205 29.0915 22.7371 29.0915 22.5892C29.0915 21.7509 30.2256 20.4196 30.9159 20.4196C31.3597 20.4196 33.6771 21.7016 36.0932 23.2302Z"
                        />
                      </svg>
                    </span>
                    <span className="font-bold">AluMNNIT</span>
                  </div>

                  <div className="-mr-2">
                    <button
                      type="button"
                      onClick={toggleMenu}
                      className={`inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-${hover_color} dark:hover:bg-${theme_color} hover:text-gray-500 dark:hover:bg-opacity-20 dark:hover:text-gray-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                    >
                      <span className="sr-only">Close menu</span>
                      <X className="h-6 w-6" aria-hidden="true" />
                    </button>
                  </div>
                </div>
                <div className="mt-6">
                  <nav className="grid gap-y-4">
                    {menuItems.map((item) => (
                      <NavLink
                        to={item.href}
                        key={item.name}
                        className={({isActive})=>`${isActive ? `text-${theme_color}` : 'dark:text-gray-200 text-gray-800'} -m-3 flex items-center rounded-md p-3 text-sm font-semibold hover:bg-${hover_color} dark:hover:bg-${theme_color} dark:hover:bg-opacity-20`}
                      >
                          {item.name}
                      </NavLink>
                    ))}
                  </nav>
                </div>
                <div className="mt-5 space-y-2">
                  <button
                    type="button"
                    className={`w-full flex items-center justify-center rounded-md border border-${theme_color} text-sm font-semibold text-black dark:text-gray-200 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                  >
                     <Link to="/login" className="w-full my-2 h-full">Log In</Link>
                    
                  </button>
                  <button 
                    type="buttton"
                    className={`w-full flex items-center justify-center rounded-md bg-${theme_color}  text-sm font-semibold dark:text-gray-200 text-white dark:hover:text-gray-200 hover:text-black shadow-sm hover:bg-black/10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
                  >
                    <Link to={'/signup'} className="w-full my-2 h-full">Sign Up</Link>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
        
    )

}

export default Navbar