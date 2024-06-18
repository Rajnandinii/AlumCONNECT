import React, { useState } from 'react'
import { Briefcase, ContactRound } from 'lucide-react';
const theme_color = import.meta.env.VITE_THEME_COLOR

const Tabs = ({handleClick, whichPosts}) => {
   

  const getALumni = ()=>{
    handleClick('Alumni')
  }
  const getStudent = ()=>{
    handleClick('Student')
  }
  const getAll = ()=>{
    handleClick('All')
  }

  return (
    <div className="mb-2 pt-0 pb-0 px-1 rounded-t-lg flex items-center justify-center w-full  overflow-y-hidden flex-nowrap bg-gray-100 dark:bg-gray-950  bg-opacity-10 text-gray-100 dark:text-gray-800">
	    
        <button id='All' onClick={getAll} className={`w-1/3 flex items-center justify-center flex-shrink-0 px-5 py-2 space-x-2 ${whichPosts==='All'? ` border border-b-0 rounded-t-lg text-${theme_color}`:`border-b dark:text-gray-600 text-gray-400`} dark:border-opacity-50  border-${theme_color}`}>
            <ContactRound className='size-4'/>
	    	<span>All </span>
	    </button>

	    <button id='Student' onClick={getStudent} className={`w-1/3 flex items-center justify-center flex-shrink-0 px-5 py-2 space-x-2 ${whichPosts==='Student'? `border border-b-0 rounded-t-lg text-${theme_color}`:`border-b dark:text-gray-600 text-gray-400`} dark:border-opacity-50 border-${theme_color}`}>
	    	<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
	    		<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
	    		<path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
	    	</svg>
	    	<span>Student</span>
	    </button>

	    <button id='Alumni' onClick={getALumni} className={`w-1/3 flex items-center justify-center flex-shrink-0 px-5 py-2 space-x-2 ${whichPosts==='Alumni'? `border border-b-0 rounded-t-lg text-${theme_color}`:`border-b dark:text-gray-600 text-gray-400`} dark:border-opacity-50 border-${theme_color}`}>
	    	<Briefcase className='size-4'/>
	    	<span>Alumni</span>
	    </button>
	    
    </div>
  )
}

export default Tabs
