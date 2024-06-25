import React, { useEffect, useState, useRef } from 'react'
import Post from '../Post'
import axios from 'axios'
import {Send,X} from 'lucide-react'
import { toast } from 'react-toastify'
import Comment from './Comment'
import { useSelector } from 'react-redux'

const theme_color = import.meta.env.VITE_THEME_COLOR;

const CommentSection = ({post, onClose}) => {
  const {user} = useSelector((state)=> state.auth)


  //handle new comment input-------------------------------------------
  const [newComment, setNewComment] = useState('')
  const handleChange = (e)=>{
        setNewComment(e.target.value)
  }

  
  //getting the comments of this post---------------------------------------------------------
  const [commentsLoading,setCommentsLoading] = useState(false)
  const [comments, setComments] = useState([])
  function wait(ms){
    return new Promise(resolve=> setTimeout(resolve,ms))
  }

  const getComments = async ()=>{
    setCommentsLoading(true)
    try{
      const response= await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/post/getComments/${post._id}`, {withCredentials:true})
      //await wait(1000)
      setComments(response.data.comments)
    }
    catch(error){
      if(error.response){
        toast.error(error.response.data.message, { className: 'dark:bg-gray-800 bg-gray-200' })
      }else toast.error('Failed to Load Comment', { className: 'dark:bg-gray-800 bg-gray-200' })
    }
    finally{
      setCommentsLoading(false)
    }
  }

  useEffect(()=>{
    getComments()
  },[])
  
  //posting a comment---------------------------------------------------------------------------------
  const handleSubmitComment = async ()=>{
        
        if(newComment===''){
          return toast.error('Empty comment can\' be posted', { className: 'dark:bg-gray-800 bg-gray-200' })
        }

        try{
          //console.log(newComment)
          const response= await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post/commentOnPost/${post._id}`,{text:newComment}, {withCredentials:true})
          //await wait(300)
          const addedComment = response.data.comment
          setComments(prevComments => [...prevComments, addedComment]);
          setNewComment('')

        }catch(error){
          if(error.response){
            toast.error(error.response.data.message, { className: 'dark:bg-gray-800 bg-gray-200' })
          }else toast.error('Failed to Comment ccc', { className: 'dark:bg-gray-800 bg-gray-200' })
        }
  }

  //scroll to end------------------------------------------------------
  const commentsRef = useRef(null)
  useEffect(()=>{
    if(commentsRef.current)
      commentsRef.current.scrollTop = commentsRef.current.scrollHeight;
  },[comments])

  

  return (
    <>
       
       <div className='flex flex-col md:ml-2 rounded-lg items-center justify-stretch w-full h-full dark:bg-gray-700 bg-gray-50 border border-gray-300 dark:border-gray-800'>

           <div id='CommentHeading' className='flex justify-between rounded-t-lg border-b dark:border-gray-700 border-gray-300 dark:bg-gray-900 bg-gray-200 py-1 items-center w-full'>
                <p className='text-md dark:text-gray-200 p-2 px-4'>Comments</p>
                <button>
                  <X onClick={onClose} className='dark:text-gray-200 text-gray-600 mx-3 size-5 transform duration-150 ease-in-out hover:scale-125'/>
                </button>
           </div>
           
           
           <div ref={commentsRef}  className='w-full h-full flex flex-col justify-end dark:bg-gray-800 overflow-y-auto'>
                 
                  {commentsLoading && 
                          <div className='w-full h-full flex items-center justify-center'>
                                <div className='backdrop-blur-sm backdrop-brightness-75 w-full h-full flex items-center justify-center'>
                                    <div className={`w-16 h-16 border-4 border-dashed rounded-full  animate-spin border-${theme_color}`}></div>
                                </div>
                          </div>}
                  
                  {!commentsLoading && comments.length===0 ? <div className='flex flex-col px-4 py-2 dark:text-gray-200 text-gray-800 items-center justify-center w-full'>No comments yet</div>:
                    <div id='Comments' className='flex flex-col px-4 w-full h-full'>
                      {comments.map((comment)=>(
                          <div key={comment._id} className='flex justify-stretch w-full'>
                            <Comment comment={comment}/>
                          </div>
                      ))}
                    </div>
                  }
   
              
           </div>

           <div id='commentBox' className='w-full px-4 pt-2 pb-1 rounded-b-lg dark:bg-gray-900 bg-gray-200'>
              
              <div className="flex justify-stretch w-full space-x-4 mt-2 mb-2 ">
                <div className='flex flex-col items-center justify-start'>
        	    	   <img  alt="" src={user.profilePicture} className="object-cover w-10 h-9 rounded-full shadow bg-gray-500" />
                </div>

        	    	<div className="flex w-full items-start justify-between space-y-1">
                  <div className='w-full'>
                      <textarea value={newComment} onChange={handleChange} onInput={(e) => {
                                                  e.target.style.height = 'auto';
                                                  e.target.style.height = (e.target.scrollHeight) + 'px';
                                                }} style={{resize:'none', overflow:'hidden'}} rows='1' placeholder='Add a comment...' className='w-full p-2 px-3 rounded-2xl max-h-[200px] dark:bg-gray-800 bg-gray-100 dark:text-gray-200 dark:focus:bg-gray-950 focus:bg-gray-50 outline-none'/>
        	    	  </div>

                  <div className='flex items-start justify-start h-full ml-2'>
                    <button onClick={handleSubmitComment}>
                       <Send className={`size-6 mt-1 ml-1 dark:text-gray-500 text-gray-400 transform duration-150  ease-in-out hover:scale-110 hover:text-${theme_color}`}/>
                    </button>
                  </div>
        
        	    	</div>
        	    </div>
              
           </div>

       </div>
      
    </>
  )
}

export default CommentSection
