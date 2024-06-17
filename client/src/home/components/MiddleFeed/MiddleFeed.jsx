import React from 'react'
import Post from '../Post/Post'
import LoadingPost from '../Post/LoadingPost'
import { useState, useEffect } from 'react'
//import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'

const theme_color = import.meta.env.VITE_THEME_COLOR


const MiddleFeed = () => {

  const [feedLoading, setFeedLoading] = useState(false)
  const [allPosts, setAllPosts] = useState([])
  
  function wait(ms){
    return new Promise(resolve=> setTimeout(resolve,ms))
  }
  
  useEffect(()=>{
    
    const getAllPosts = async ()=>{
       
      setFeedLoading(true)
      try{

        const response= await axios.get(`${import.meta.env.VITE_SERVER_URL}/api/post/getAllPosts`, {withCredentials:true})
        await wait(1000)
        setAllPosts(response.data.posts)

      }catch(error){
        if(error.response){
          toast.error(error.response.data.message, { className: 'dark:bg-gray-800 bg-gray-200' })
        }else toast.error('Failed to load Posts', { className: 'dark:bg-gray-800 bg-gray-200' })
      }
      finally{
        setFeedLoading(false)
      }
    }
    
    getAllPosts()

  },[])
  
  


  return (
    <div>
        <div className="relative flex flex-col items-center w-full h-full">
            
             
            {feedLoading && <div className='mb-2 w-full'>
              <LoadingPost/>
            </div>}

            {!feedLoading &&  allPosts.length===0 ? <div className='text-gray-500'>No Post to show , follow more people</div> : 
              
              allPosts.map((post)=>(post?
                <div key={post._id} className='mb-2 w-full'>
                  <Post post={post}/>
                </div>:<div>deleted</div>
              )) 
            }
           
        </div>
      
    </div>
  )
}

export default MiddleFeed
