import React from "react";
import { Outlet } from "react-router-dom";

import {Topbar, MiddleFeed} from './components/index.js'

function HomeLayout() {
    return (
      <>
        <div className="w-full md:flex">
             <Topbar/>
             <Outlet/>
        </div>
      
      </>
    )
  }
  
  export default HomeLayout