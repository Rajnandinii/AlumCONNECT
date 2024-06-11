import React from 'react'
import {SquareArrowOutUpRight} from 'lucide-react'
import {Link} from 'react-router-dom'

{/* <div className='flex justify-end'>
                            <Link  className='text-xs hover:underline leading-none'>Checkout </Link>
                        </div> */}

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const UpcomingEvents = () => {
  return (
    <div>
        <div className='rounded-lg w-full flex pb-2 flex-col items-stretch shadow-lg bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-800'>
            <div className={`flex justify-start m-2 mx-4 text-${theme_color}`}>
                <span className='text-xs'>Upcoming Events</span>
            </div>

            <div className='flex flex-col items-stretch justify-between w-full dark:text-gray-200 max-h-60 overflow-y-auto scrollbar-hide'>
                <ul>
                    <Link>
                        <li className=' p-1 px-4 hover:bg-lime-600 hover:bg-opacity-10'>
                            <div className='flex justify-between items-start'>
                                <div  className='text-sm pr-2'>
                                    Avishkar 2024: Programmers fair
                                </div>
                                <div className='min-w-5'>
                                    <SquareArrowOutUpRight className=' size-4'/>
                                </div>
                            </div>
                            <div  className='text-xs text-gray-500 pr-2'>
                                    24-06-2024
                            </div>
                        </li>
                    </Link>
                    
                    <Link>
                        <li className=' p-1 px-4 hover:bg-lime-600 hover:bg-opacity-10'>
                            <div className='flex justify-between items-start'>
                                <div  className='text-sm pr-2'>
                                    MNNIT Alumni Summit is around the corner
                                </div>
                                <div className='min-w-5'>
                                    <SquareArrowOutUpRight className=' size-4'/>
                                </div>
                            </div>
                            <div  className='text-xs text-gray-500 pr-2'>
                                    24-06-2024
                            </div>
                        </li>
                    </Link>
                    <Link>
                        <li className=' p-1 px-4 hover:bg-lime-600 hover:bg-opacity-10'>
                            <div className='flex justify-between items-start'>
                                <div  className='text-sm pr-2'>
                                    Avishkar 2024: Programmers fair
                                </div>
                                <div className='min-w-5'>
                                    <SquareArrowOutUpRight className=' size-4'/>
                                </div>
                            </div>
                            <div  className='text-xs text-gray-500 pr-2'>
                                    24-06-2024
                            </div>
                        </li>
                    </Link>

                    <Link>
                        <li className=' p-1 px-4 hover:bg-lime-600 hover:bg-opacity-10'>
                            <div className='flex justify-between items-start'>
                                <div  className='text-sm pr-2'>
                                    How am i gonna forget, i wonder, will it be possible in this life
                                </div>
                                <div className='min-w-5'>
                                    <SquareArrowOutUpRight className=' size-4'/>
                                </div>
                            </div>
                            <div  className='text-xs text-gray-500 pr-2'>
                                    24-06-2024
                            </div>
                        </li>
                    </Link>
                    
                </ul>
            </div>

        </div>
    </div>
  )
}

export default UpcomingEvents
