import React, { useEffect, useState } from 'react'
import {Share2, Bookmark, ThumbsUp, MessageSquareText} from 'lucide-react'
import { getTimeAgo } from '../../../hooks/getTimeAgo';
import ExpandableText from './ExpandableText.jsx';
import PostWithComment from './CommentSection/PostWithComment.jsx'
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify'

const theme_color = import.meta.env.VITE_THEME_COLOR;
const hover_color = import.meta.env.VITE_HOVER_COLOR;

const Post = ({post, onCommentClick}) => {

     
	if(!post){
		return <div className='text-white'>Null post</div>
	}
    const timeAgo = getTimeAgo(post.timestamp.createdAt)

	//like ----------------------------------------------------------
	const {user} = useSelector((state)=>state.auth)

	const isLikedByUser = post.likes.some(like => like.user.toString() === user._id);
	const [liked, setLiked] = useState(isLikedByUser)
	const [numLikes, setNumLikes] = useState(post.likes.length)


	
	const likePost = async ()=>{
		try{
            const response= await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post/likeUnlikePost/${post._id}`, {}, {withCredentials:true})
			setLiked(!liked)
			if(liked){
				setNumLikes(prev=>prev-1)
			}
			else setNumLikes(prev=>prev+1)
		}
		catch(error){
			if(error.response){
				toast.error(error.response.data.message, { className: 'dark:bg-gray-800 bg-gray-200' })
			}
			else toast.error('Failed to Like', { className: 'dark:bg-gray-800 bg-gray-200' })
		}
	}

  
  return( 
	<>

    <div className='w-full flex flex-col items-center'>
        <div className="flex flex-col w-full max-w-lg px-6 pt-6 pb-3 space-y-0 overflow-hidden rounded-lg shadow-2xl dark:bg-gray-900 bg-gray-50 text-gray-100 border border-gray-300 dark:border-gray-800">
        	<div className="flex space-x-4 mb-6">
        		<img alt="" src={post.profilePic} className="object-cover w-12 h-12 rounded-full shadow bg-gray-500" />
        		<div className="flex flex-col space-y-1">
        			<a rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-100 text-sm font-semibold">{post.username}</a>
        			<span className="text-xs dark:text-gray-400 text-gray-600">{timeAgo}</span>
        		</div>
        	</div>

        	<div className='pb-2'>
        		{post.postImg===''? <span></span> : <img src={post.postImg} alt="" className="object-contain w-full mb-4  bg-gray-500" />}
        		<h2 className="mb-1 text-xl font-semibold dark:text-gray-100 text-gray-800">{post.title}</h2>
				{post.description===''?<span></span> : <ExpandableText text={post.description}/>}
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
        			<button onClick={onCommentClick} type="button" className="flex items-center p-1 space-x-1.5 transform transition-transform hover:scale-125">
					    <MessageSquareText  className={`size-4 text-${theme_color}`}/>
        				<span>{post.comments.length}</span>
        			</button>
        			<button onClick={likePost} type="button" className="flex items-center p-1 space-x-1.5 transform transition-transform hover:scale-125">
					    <ThumbsUp fill={liked ? `currentColor`:`none`} className={`size-4 text-${theme_color}`}/>
        				<span>{numLikes}</span>
        			</button>
        		</div>
        	</div>
        </div>
      
    </div>
	</>
  )
}

export default Post
