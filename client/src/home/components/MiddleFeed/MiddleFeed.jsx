import React from 'react'
import Post from '../Post/Post'
import LoadingPost from '../Post/LoadingPost'
import { useState, useEffect, useRef } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import Tabs from './Tabs'
import PostWithComment from '../Post/CommentSection/PostWithComment'

const theme_color = import.meta.env.VITE_THEME_COLOR


const MiddleFeed = () => {

  const [feedLoading, setFeedLoading] = useState(false)
  const [posts, setPosts] = useState([])
  const [whichPosts, setWhichPosts] = useState('All') //Student or Alumni
  
  function wait(ms){
    return new Promise(resolve=> setTimeout(resolve,ms))
  }

  const getPosts = async ()=>{     //fetch posts (all, student or alumni)
    setFeedLoading(true)
    
    try{

      const response= await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/post/getPosts?type=${whichPosts}`, {withCredentials:true})
      await wait(300)
      setPosts(response.data.posts)

    }catch(error){
      if(error.response){
        toast.error(error.response.data.message, { className: 'dark:bg-gray-800 bg-gray-200' })
      }else toast.error('Failed to load Posts', { className: 'dark:bg-gray-800 bg-gray-200' })
    }
    finally{
      setFeedLoading(false)
    }
  }
  
  useEffect(()=>{

    getPosts()

  },[whichPosts])

  const handleClick = async (type)=>{   
    if(type===whichPosts){
        return null
    }
    setWhichPosts(type)
  }

  //FOR COMMENT SECTION-----------------------------------------------------------------------------
  const [activePost, setActivePost] = useState(null)

  const handleCommentOpen = (post)=>{
    document.body.classList.add('scroll-lock');
    setActivePost(post);
  }

  const handleCommentClose = ()=>{
    document.body.classList.remove('scroll-lock');
    setActivePost(null)
  }


  return (
    <div>
        <div className="relative flex flex-col items-center w-full h-full">
            
            <Tabs handleClick={handleClick} whichPosts={whichPosts}/>
             
            {feedLoading && <div className='mb-2 w-full'>
              <LoadingPost/>
            </div>}


            {!feedLoading &&  posts.length===0 ? <div className='text-gray-500'>No Post to show , follow more people</div> : 
              <div className='relative flex flex-col items-center justify-start w-full h-full'>

                {posts.map((post)=>(
                  post?
                      <div key={post._id} className='mb-2 w-full flex flex-col items-center'>
                        <Post post={post} onCommentClick={()=>handleCommentOpen(post)}/>
                      </div>
                     :    <div>deleted</div>
                ))} 
              </div>
            }

            {activePost && 
              <div className='' >
                <PostWithComment post={activePost} onClose={handleCommentClose} />
              </div>
            }
           
        </div>
      
    </div>
  )
}

export default MiddleFeed
