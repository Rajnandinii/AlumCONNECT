import React from 'react'
import { NavLink } from 'react-router-dom';
import { UserPlus } from 'lucide-react';

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const Suggestions = () => {
  return (
    <div>

        <div className='mt-4 rounded-lg w-full flex px-4 pt-2 flex-col items-stretch shadow-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800'>
            <div className={`flex justify-between mb-4 text-${theme_color}`}>
                <span className='text-xs'>Suggestions</span>
                <NavLink className={`text-xs transition-transform underline hover:scale-125 rounded-lg`}>
                   See All
                </NavLink>
            </div>
 
            <div className='flex flex-col items-stretch justify-start'>
                {/*-----------------------------------------------------------------------*/}
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex justify-start items-center space-x-2'>
                        <div>
                            <img src='https://images.indianexpress.com/2021/04/Anniyan.jpg' alt="" className="max-w-12 h-12 object-cover rounded-full bg-gray-500"/>
                        </div>
                        <div className='flex flex-col'>
                            <a rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-100 text-sm font-semibold">
                                Ambi
                            </a>
                            <span className="text-xs dark:text-gray-400 text-gray-600">
                                Pre Final Year Student at MNNIT
                            </span>
                        </div>

                    </div>
                    <div className='dark:text-gray-200'>
                        <button className={` transition-transform hover:scale-75 hover:text-${theme_color}`}>
                            <UserPlus />
                        </button>
                        <span className='hidden dark:bg-gray-950 p-2 px-4 text-sm rounded-full shadow-inner'>Sent</span>
                    </div>
                </div>
                {/*-----------------------------Below are extra profiles------------------------------------------*/}
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex justify-start items-center space-x-2'>
                        <div>
                            <img src='https://i.pinimg.com/564x/8a/ac/55/8aac551c0d7d1d0f43fb3ff2f8d78b70.jpg' alt="" className="max-w-12 h-12 object-cover rounded-full bg-gray-500"/>
                        </div>
                        <div className='flex flex-col'>
                            <a rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-100 text-sm font-semibold">
                                Tom
                            </a>
                            <span className="text-xs dark:text-gray-400 text-gray-600">
                                Dont look at me
                            </span>
                        </div>

                    </div>
                    <div className='dark:text-gray-200'>
                        <button className={` transition-transform hover:scale-75 hover:text-${theme_color}`}>
                            <UserPlus />
                        </button>
                        <span className='hidden dark:bg-gray-950 p-2 px-4 text-sm rounded-full shadow-inner'>Sent</span>
                    </div>
                </div>
                {/*---------------------------------------------------------------------------------------*/}
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex justify-start items-center space-x-2'>
                        <div>
                            <img src='https://i.pinimg.com/564x/de/fc/f9/defcf9f27f764817f946415e87c19e67.jpg' alt="" className="max-w-12 h-12 object-cover rounded-full bg-gray-500"/>
                        </div>
                        <div className='flex flex-col'>
                            <a rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-100 text-sm font-semibold">
                                Jim Halpert
                            </a>
                            <span className="text-xs dark:text-gray-400 text-gray-600">
                                I'm not Dwight's friend
                            </span>
                        </div>

                    </div>
                    <div className='dark:text-gray-200'>
                        <button className={` transition-transform hover:scale-75 hover:text-${theme_color}`}>
                            <UserPlus />
                        </button>
                        <span className='hidden dark:bg-gray-950 p-2 px-4 text-sm rounded-full shadow-inner'>Sent</span>
                    </div>
                </div>
                {/*---------------------------------------------------------------------------------------*/}
                <div className='flex justify-between items-center mb-4'>
                    <div className='flex justify-start items-center space-x-2'>
                        <div>
                            <img src='https://i.pinimg.com/564x/3e/25/44/3e2544e7d5f0949e78f906fe7ad9c4c6.jpg' alt="" className="max-w-12 h-12 object-cover rounded-full bg-gray-500"/>
                        </div>
                        <div className='flex flex-col'>
                            <a rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-100 text-sm font-semibold">
                                Tom Hansen
                            </a>
                            <span className="text-xs dark:text-gray-400 text-gray-600">
                                About to hit 500
                            </span>
                        </div>

                    </div>
                    <div className='dark:text-gray-200'>
                        <button className={` transition-transform hover:scale-75 hover:text-${theme_color}`}>
                            <UserPlus />
                        </button>
                        <span className='hidden dark:bg-gray-950 p-2 px-4 text-sm rounded-full shadow-inner'>Sent</span>
                    </div>
                </div>

            </div>           

        </div>
      
    </div>
  )
}

export default Suggestions
