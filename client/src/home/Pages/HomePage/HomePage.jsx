import React from 'react'

import { AddPostBtn, MiddleFeed,ProfileLeftSidebar, UpcomingEvents, Suggestions, AddPost } from '../../components'
const theme_color = import.meta.env.VITE_THEME_COLOR

const HomePage = () => {
  return (
    <>
      <main className="">

        <div className="flex justify-center ">
        
          <div className="flex items-start justify-center w-full max-w-[1100px] gap-5 ">
            
            <div className="sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[280px] md:block sticky top-20 hidden ">
              <ProfileLeftSidebar/>
              <AddPostBtn />
            </div>
            
            <div className="w-[380px] sm:w-[520px] md:w-[520px] lg:w-[520px] xl:w-[520px]  ">
              <MiddleFeed/>
            </div>
            
            <div className="lg:w-[240px] xl:w-[320px] hidden lg:block overflow-auto">
              <UpcomingEvents />
              <Suggestions />
            </div>

          </div>

        </div>

      </main>
       
      
    </>
  )
}

export default HomePage
