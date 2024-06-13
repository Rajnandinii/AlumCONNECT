import React from "react";
import { Outlet } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import {Topbar, AddPost} from './components/index.js'


function HomeLayout() {

    const isPostFormOpen = useSelector((state)=>state.postFormToggle.isPostFormOpen)  

    return (
      <>
        <div className={`w-full min-h-screen md:flex dark:bg-gray-950 bg-gray-200 `}>
             <Topbar/>

              {isPostFormOpen && 
                <div className="transition"> 
                  <AddPost/>
                </div>
              }

             <div className="pt-20 w-full "> 
                <Outlet/>
             </div>
             
        </div>
      
      </>
    )
  }
  
  export default HomeLayout