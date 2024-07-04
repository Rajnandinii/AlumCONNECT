import React from 'react'
import { getTimeAgo } from '../../../../hooks/getTimeAgo'
import { useSelector } from 'react-redux'

const Comment = ({comment}) => {

    let timeAgo
    const created = comment?.timestamp?.createdAt || '1s'
    if(created==='1s'){
        timeAgo =  '1s' 
    }
    else timeAgo = getTimeAgo(created)

    

  return (
    <div className="flex justify-stretch w-full space-x-4 mt-2 mb-2">
        <div className='flex flex-col items-center justify-start'>
        	    <img alt="" src={comment.profilePic} className="object-cover w-8 h-7 rounded-full shadow bg-gray-500" />
        </div>

        <div className="flex w-full flex-col items-start justify-start space-y-1">
            <div className='leading-5'>
        	    <a rel="noopener noreferrer" href="#" className="text-gray-800 dark:text-gray-50 text-sm font-semibold mr-2">{comment.username}</a>
                <span  className='leading-tight dark:text-gray-200 text-sm break-words'>
                   {comment.text}
                </span>
            </div>
                      
        	    <span className="text-xs dark:text-gray-400 text-gray-600">{timeAgo}</span>
        </div>
    </div>
  )
}

export default Comment
