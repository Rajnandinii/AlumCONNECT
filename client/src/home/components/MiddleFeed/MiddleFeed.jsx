import React from 'react'
import Post from '../Post/Post'

const MiddleFeed = () => {
  return (
    <div>
        <div className="flex flex-col items-center">
             
            <div className='mb-2'>
              <Post/>
            </div>

            <div className='mb-2'>
              <Post/>
            </div>

            <div className='mb-2'>
              <Post/>
            </div>

            <div className='mb-2'>
              <Post/>
            </div>

            <div className='mb-2'>
              <Post/>
            </div>
             
        </div>
      
    </div>
  )
}

export default MiddleFeed
