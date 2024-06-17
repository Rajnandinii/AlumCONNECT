import React from 'react'
import {Share2, Bookmark, ThumbsUp, MessageSquareText} from 'lucide-react'
import { getTimeAgo } from '../../../utils/getTimeAgo';

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const Post = ({post}) => {
  
	if(!post){
		return <div className='text-white'>Null post</div>
	}
    
    const timeAgo = getTimeAgo(post.timestamp.createdAt)

	console.log(post)
  
  return( 
    <div>
        <div className="flex flex-col max-w-lg p-6 space-y-6 overflow-hidden rounded-lg shadow-2xl dark:bg-gray-900 bg-gray-50 text-gray-100 border border-gray-300 dark:border-gray-800">
        	<div className="flex space-x-4">
        		<img alt="" src="https://i.pinimg.com/736x/01/05/b5/0105b5a8865355f0c551606c4fee9120.jpg" className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
        		<div className="flex flex-col space-y-1">
        			<a rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-100 text-sm font-semibold">{post.username}</a>
        			<span className="text-xs dark:text-gray-400 text-gray-600">{timeAgo}</span>
        		</div>
        	</div>
        	<div>
        		<img src={post.postImg} alt="" className="object-contain w-full mb-4  bg-gray-500" />
        		<h2 className="mb-1 text-xl font-semibold dark:text-gray-100 text-gray-800">{post.title}</h2>
        		<p className="text-sm dark:text-gray-400 text-gray-700">{post.description}</p>
        	</div>
        	<div className="flex flex-wrap justify-between">
        		<div className="space-x-2">
        			<button aria-label="Share this post" type="button" className="p-2 text-center transform transition-transform hover:scale-125">
						<Share2 className={`size-4 text-${theme_color}`}/>
        			</button>
        			<button aria-label="Bookmark this post" type="button" className="p-2 transform transition-transform hover:scale-125">
					    <Bookmark className={`size-4 text-${theme_color}`}/>
        			</button>
        		</div>
        		<div className="flex space-x-2 text-sm text-gray-400">
        			<button type="button" className="flex items-center p-1 space-x-1.5 transform transition-transform hover:scale-125">
					    <MessageSquareText className={`size-4 text-${theme_color}`}/>
        				<span>14</span>
        			</button>
        			<button type="button" className="flex items-center p-1 space-x-1.5 transform transition-transform hover:scale-125">
					    <ThumbsUp className={`size-4 text-${theme_color}`}/>
        				<span>83</span>
        			</button>
        		</div>
        	</div>
        </div>
      
    </div>
  )
}

export default Post
