import React from "react";
import { Outlet } from "react-router-dom";

import {Topbar} from './components/index.js'


function HomeLayout() {
    return (
      <>
        <div className="w-full min-h-screen md:flex dark:bg-gray-950 bg-gray-200">
             <Topbar/>
             <div className="pt-20 w-full "> 
                <Outlet/>
             </div>
             
        </div>
      
      </>
    )
  }
  
  export default HomeLayout