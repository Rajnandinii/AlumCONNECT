import React from 'react'
import {Share2, Bookmark, ThumbsUp, MessageSquareText} from 'lucide-react'

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const LoadingPost = () => {
  return (
    <div className=''>
        <div className="relative flex flex-col max-w-lg space-y-6 overflow-hidden rounded-lg shadow-2xl dark:bg-gray-900 bg-gray-50 text-gray-100 border border-gray-300 dark:border-gray-800">
            
            <div className='absolute inset-0 z-10  flex items-center justify-center'>
                <div className='backdrop-blur-sm  w-full h-full flex items-center justify-center'>
                    <div className={`w-16 h-16 border-4 border-dashed rounded-full shadow-2xl animate-spin border-${theme_color}`}></div>
                </div>
            </div>

          <div className='flex flex-col w-full max-w-lg p-6 animate-pulse space-y-6 overflow-hidden rounded-lg shadow-2xl dark:bg-gray-900 bg-gray-50 text-gray-100 border border-gray-300 dark:border-gray-800'>
        	<div className="flex space-x-4">
        		<img alt="" src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png" className="object-cover w-12 h-12 rounded-full opacity-20 shadow bg-gray-500" />
        		<div className="flex flex-col space-y-1 items-stretch w-20">
        			<p rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-100 text-sm font-semibold h-4 dark:bg-gray-800 bg-gray-300"></p>
        			<span className="text-xs dark:text-gray-400 text-gray-600 h-3 w-1/2 dark:bg-gray-800 bg-gray-300"></span>
        		</div>
        	</div>
        	<div className='w-full'>
                <div className='w-full h-[400px] flex items-center justify-center dark:bg-gray-800 bg-gray-300'>
                     
                </div>
        		<h2 className="mb-1 text-xl font-semibold dark:text-gray-100 mt-2 text-gray-800 h-5 w-1/2 dark:bg-gray-800 bg-gray-300"></h2>
        		<p className="text-sm dark:text-gray-400 text-gray-700 h-5 mt-3 dark:bg-gray-800 bg-gray-300"></p>
                <p className="text-sm dark:text-gray-400 text-gray-700 h-5 mt-1 dark:bg-gray-800 bg-gray-300"></p>
        	</div>
        	<div className="flex flex-wrap justify-between">
        		<div className="space-x-2">
        			<button aria-label="Share this post" type="button" className="p-2 text-center transform transition-transform hover:scale-125">
						<Share2 className={`size-4 dark:bg-gray-700 bg-gray-300`}/>
        			</button>
        			<button aria-label="Bookmark this post" type="button" className="p-2 transform transition-transform hover:scale-125">
					    <Bookmark className={`size-4 dark:bg-gray-700 bg-gray-300`}/>
        			</button>
        		</div>
        		<div className="flex space-x-2 text-sm text-gray-400">
        			<button type="button" className="flex items-center p-1 space-x-1.5 transform transition-transform hover:scale-125">
					    <MessageSquareText className={`size-4 dark:bg-gray-700 bg-gray-300`}/>
        				<span></span>
        			</button>
        			<button type="button" className="flex items-center p-1 space-x-1.5 transform transition-transform hover:scale-125">
					    <ThumbsUp className={`size-4 dark:bg-gray-700 bg-gray-300`}/>
        				<span></span>
        			</button>
        		</div>
        	</div>

          </div>  
        </div>
      
    </div>
  )
}

export default LoadingPost
