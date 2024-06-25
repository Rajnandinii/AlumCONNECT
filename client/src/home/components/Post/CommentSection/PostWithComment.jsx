import React from 'react'
import Post from '../Post'
import CommentSection from './CommentSection'

const PostWithComment = ({post, onClose}) => {
  return (
    <>
       <div className='fixed w-full h-full backdrop-blur-sm backdrop-brightness-50 inset-0 flex items-center justify-center z-40'>
            
            <div className={`flex sm:flex-col md:flex-row items-center justify-center`}>

              <div className={`hidden md:block h-[550px] md:w-[350px] lg:w-[450px] overflow-y-auto  scrollbar-hide `}>
                  <Post post={post} onCommentClick={onClose}/>
              </div>
  
              <div className='h-[550px] w-[350px] sm:w-[400px] md:w-[350px] lg:w-[450px] '>
                  <CommentSection post={post} onClose={onClose}/>
              </div>
            </div>
            
            
       </div>
      
    </>
  )
}

export default PostWithComment
